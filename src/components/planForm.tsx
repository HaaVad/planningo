"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React, {useState} from "react"
import { slugify } from "./utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SharePlanDialogue } from "./sharePlanDialogue"

const formSchema = z.object({
  slug: z.string(),
  owner: z.string(),
  name: z.string().min(2).max(30),
  description: z.string(),
  dateAlternatives: z.array(z.date()).min(2).max(20),
  })


export function PlanForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      name: "",
      owner: "",
      description: "",
      dateAlternatives:[]
    },
    })
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [slug, setSlug] = useState<string>("");

    async function onSubmit(values: z.infer<typeof formSchema>) {


      console.log(values.dateAlternatives)
      const newSlug = slugify(values.name);
      setSlug(newSlug);
      const requestBody = {
        name: values.name,
        description: values.description,
        owner: "Queen of the plan",
        slug: newSlug,
        dateAlternatives: values.dateAlternatives,
      };

      console.log(JSON.stringify(requestBody, null, 2));

      
      try {
        const response = await fetch(`https://localhost:7058/plan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody
          ),


        });

        if (!response.ok) {
          throw new Error('Something is flailing!');

        }

        const data = await response.json();
        console.log(data);
        setSubmissionSuccess(true);


      } catch (error) {
        console.error('Error occurred while submitting data:', error);
      }
    }
    
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col justify-center">
        <FormField
          control={form.control}
          name="name" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <Input placeholder="Enter title here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="description" 
          render={({ field }) => (
            <FormItem >
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Describe, or dont!" {...field} />
              </FormControl>
            </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="dateAlternatives" 
          render={({ field }) => (
            <FormItem>
            <FormLabel>Pick dateAlternatives</FormLabel>
              <FormControl>
              <Calendar
                 mode="multiple"
                 max={20}
                 selected={field.value}
                 onSelect={field.onChange}
                 className="rounded-md border bg-white"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage>{form.formState.errors.dateAlternatives?.message}</FormMessage>

            </FormItem>
            )}
        />   
        
        <div className="mx-auto">    
        <Button type="submit">
        <SharePlanDialogue submissionSuccess={submissionSuccess} slug={slug}/>
        </Button>
        
        </div>
      </form>
    </Form>
  );} 
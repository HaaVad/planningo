"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React from "react"
import { slugify } from "./utils"

//import supabase from '@/path/to/supabase';


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
  dates: z.array(z.date()).min(2).max(20),
  })


export function PlanForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      name: "",
      owner: "",
      description: "",
      dates:[]
    },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
      const slug = slugify(values.name);
      // console.log(values); // log the response data if needed

    
      try {
        const isoDates = values.dates.map((date: Date) => date.toISOString());
        const response = await fetch(`https://localhost:7058/plan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            owner: "Planningo",
            slug: slug,
            dates: isoDates,
          }
          ),


        });
        console.log(isoDates); // log the response data if needed

        if (!response.ok) {
          throw new Error('Naaat working!');

        }
    
        // Assuming you want to wait for the response body to be read as JSON
        const data = await response.json();
        
        console.log(data); // log the response data if needed
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
              <FormMessage />
            </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="dates" 
          render={({ field }) => (
            <FormItem>
            <FormLabel>Pick dates</FormLabel>
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
              <FormMessage>{form.formState.errors.dates?.message}</FormMessage>

            </FormItem>
            )}
        />   
        
        <div className="mx-auto">    
        <Button type="submit">Submit</Button>

        </div>
      </form>
    </Form>
  );} 



      // async function onSubmit(values: z.infer<typeof formSchema>) {
    //   const slug = slugify(values.name);

    //   // const { data, error } = await supabase
    //   const data = await fetch(`https://localhost:7058/plan`, {
    //     method: 'POST',
    //     })

    //   .from("your_table_name")
    //   .insert([
    //     {
    //       id: values.id,
    //       slug: slug,
    //       name: values.name,
    //       description: values.description,
    //       date_alternatives: values.dateAlternatives,
    //     },
    //   ]);
      
    //   console.log(values)
    //   console.log(slug)
    // }  
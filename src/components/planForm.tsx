"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React from "react"

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
  id: z.string(),
  slug: z.string(),
  title: z.string().min(2).max(30),
  description: z.string(),
  dateAlternatives: z.array(z.date()).min(2).max(20),
  })


export function PlanForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      dateAlternatives:[]
    },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // const { data, error } = await supabase
      // .from("your_table_name")
      // .insert([
      //   {
      //     id: values.id,
      //     title: values.title,
      //     description: values.description,
      //     date_alternatives: values.dateAlternatives,
      //   },
      // ]);
      
      console.log(values)
    }  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col justify-center">
        <FormField
          control={form.control}
          name="title" 
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
          name="dateAlternatives" 
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
              <FormMessage>{form.formState.errors.dateAlternatives?.message}</FormMessage>

            </FormItem>
            )}
        />   
        
        <div className="mx-auto">    
        <Button type="submit">Submit</Button>

        </div>
      </form>
    </Form>
  );} 
"use client"

import React, { useState} from "react"
import { Plan } from "../../types/Plan"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Button } from "./ui/button"


interface ViewPlanProps {
    plan: Plan;
}

const formSchema = z.object({
  // id: z.string(),
  slug: z.string(),
  name: z.string().min(2),
  dateAlternatives: z.array(z.date()),
  })


const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'Europe/Oslo' };
const weekDayOptions:  Intl.DateTimeFormatOptions = { weekday: 'long', timeZone: 'Europe/Oslo' };


export function ViewPlan({ plan }: ViewPlanProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    // id: "",
    slug: "",
    name: "",
    dateAlternatives:[]
  },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Any dates here: "+values.dateAlternatives)

    const requestBody = {
      // id: plan.planId,
      slug: plan.slug,
      name: values.name,
      dateAlternatives: values.dateAlternatives,
    };
    console.log(JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch(`https://localhost:7058/vote`, {
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


    } catch (error) {
      console.error('Error occurred while submitting data:', error);
    }
  }

  // Get correct format for dates
  const dates: Date[] = plan.dateAlternatives.map(dateString => new Date(dateString));



    return(
<div >
<Form {...form} >
<form onSubmit={form.handleSubmit(onSubmit)}>
<Table>
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Date</TableHead>
      <TableHead>Votes</TableHead>
      <TableHead className="text-right">Yay or Nay?</TableHead>
    </TableRow>
  </TableHeader>
  {dates
  .map((date, index) => ( 
  <FormField
  key={date.toLocaleString()}
  control={form.control}
  name="dateAlternatives" 
  render={({ field }) => (
            <TableBody key={date.toLocaleString()}>
           <TableRow >
           <TableCell className="font-medium">
            <p>{date.toLocaleString("en", weekDayOptions)}</p>
           <p>{ date.toLocaleString("en", dateOptions)}</p>
           </TableCell>
             <TableCell className="px-6">1</TableCell>
             <TableCell className="text-right">
               <FormItem>
                          <Checkbox
                            checked={field.value?.includes(date)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, date])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== date
                                    )
                                  )
                    }}
                />
        </FormItem>
      </TableCell>
    </TableRow>
    </TableBody>
     )}
   />  
  ))}
</Table>

<div className="flex p-4 gap-10 justify-end">
<FormField
          control={form.control}
          name="name" 
          render={({ field }) => (
  <FormItem>
  <FormControl>
  <Input placeholder="Your name" className="w-32"  {...field}/>
  </FormControl>
  <FormMessage className="-ml-5 absolute"/>
  </FormItem>
              )}
              />
  <Button type="submit">Vote</Button>
  </div>
  </form>
  </Form>
</div>


    )
}


// onClick={() => toggleVote(index)} className="font-semibold text-lg"

// {votes[index] ? "Yay!" : "Nay."}

"use client"

import React from "react"
import { Plan } from "../../types/Plan"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Checkbox } from "./ui/checkbox" 


interface ViewPlanProps {
    plan: Plan;
}

const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'Europe/Oslo' };
const weekDayOptions:  Intl.DateTimeFormatOptions = { weekday: 'long', timeZone: 'Europe/Oslo' };

export function ViewPlan({ plan }: ViewPlanProps) {

    return(
<Table>
  <TableCaption>{plan.description}</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Day</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Can join?</TableHead>
    </TableRow>
  </TableHeader>
  {plan.dateAlternatives
.map((dateAlternative, index) => ( 
  <TableBody key={index+1}>
    <TableRow >
      <TableCell className="font-medium">{dateAlternative.toLocaleDateString("en", weekDayOptions)}</TableCell>

      <TableCell>{dateAlternative.toLocaleDateString("en", dateOptions)}</TableCell>

      <TableCell className="text-right">
        <Checkbox />
      </TableCell>
    </TableRow>
  </TableBody>
  ))}
</Table>



    )
}


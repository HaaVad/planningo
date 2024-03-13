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
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox" 
import { Button } from "./ui/button"


interface ViewPlanProps {
    plan: Plan;
}

const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'Europe/Oslo' };
const weekDayOptions:  Intl.DateTimeFormatOptions = { weekday: 'long', timeZone: 'Europe/Oslo' };


export function ViewPlan({ plan }: ViewPlanProps) {

    return(
<div>
<Table>
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Day</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Votes</TableHead>
      <TableHead className="text-right">Can join?</TableHead>
    </TableRow>
  </TableHeader>
  {plan.dates
.map((date, index) => ( 
  <TableBody key={index+1}>
    <TableRow >
      <TableCell className="font-medium">{date.toLocaleString("en", weekDayOptions)}</TableCell>

      <TableCell>{date.toLocaleString("en", dateOptions)}</TableCell>
      <TableCell className="px-6">1</TableCell>
      <TableCell className="text-right">
        <Checkbox />
      </TableCell>
    </TableRow>
  </TableBody>
  ))}
</Table>
<div className="flex p-4 gap-10 justify-end">
  <Input placeholder="Your name" className="w-32"/>
  <Button>Vote</Button>
  </div>

</div>


    )
}


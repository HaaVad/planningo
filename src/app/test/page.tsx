// import { Checkbox } from "@/components/ui/checkbox"; 
// import { SharePlanDialogue } from "@/components/sharePlanDialogue";

// export default function Home() {


//   return (
//       <div className="flex flex-col gap-8">
//         <SharePlanDialogue />
//       </div>
//   );
// }


// import { Plan } from "../../../types/Plan"; 
// type Props = {
//     params: {slug: string};
//   };
  



// export default async function Page({params}: Props) {
//     const res = await fetch(`https://localhost:7058/plan/1`, {
//       method: 'GET',
//       })
//     const data: Plan = await res.json();
//     console.log(data)    
//     return(
//     <div>
//         {data.name}
//     </div>
//     );
// }




// {
//   "name": "BellaDelfi",
//   "description": "vdrfads",
//   "owner": "Planningo",
//   "slug": "pl13belladelfi2an",
//   "dates": [
//     "2024-03-21T23:00:00.000Z",
//     "2024-03-27T23:00:00.000Z",
//     "2024-03-25T23:00:00.000Z",
//     "2024-03-18T23:00:00.000Z"
//   ]
// }


// {
//   "name": "string",
//   "description": "string",
//   "owner": "string",
//   "slug": "string",
//   "dates": [
//     "2024-03-13T14:24:32.149Z"
//     "2024-03-18T23:00:00.000Z"

//   ]
// }


"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export default function CheckboxReactHookFormMultiple() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                                                <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>

                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

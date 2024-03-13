// import { Checkbox } from "@/components/ui/checkbox"; 
// import { SharePlanDialogue } from "@/components/sharePlanDialogue";

// export default function Home() {


//   return (
//       <div className="flex flex-col gap-8">
//         <SharePlanDialogue />
//       </div>
//   );
// }


import { Plan } from "../../../types/Plan"; 
type Props = {
    params: {slug: string};
  };
  



export default async function Page({params}: Props) {
    const res = await fetch(`https://localhost:7058/plan/1`, {
      method: 'GET',
      })
    const data: Plan = await res.json();
    console.log(data)    
    return(
    <div>
        {data.name}
    </div>
    );
}

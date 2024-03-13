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
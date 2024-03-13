import { ViewPlan } from "@/components/viewPlan";
import { Plan } from "../../../../types/Plan";

type Props = {
  params: {slug: string};
};


export default async function PlanView({params}: Props) {
  const res = await fetch(`https://localhost:7058/plan/${params.slug}`, {
    method: 'GET',
    })
  const data: Plan = await res.json();
  console.log(data)    


  return (
    <main>
      <h2 >{data.name}</h2>
      <p className="">{data.description}</p>
      <ViewPlan plan={data}></ViewPlan>
    </main>
  );
}



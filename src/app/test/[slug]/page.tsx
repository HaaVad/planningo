import { Plan } from "../../../../types/Plan"; 

type Props = {
    params: {slug: string};
  };
  



export default async function Page({params}: Props) {
    const res = await fetch(`https://localhost:7058/plan/${params.slug}`, {
      method: 'GET',
      })
    const data: Plan = await res.json();
    console.log(data)    
    return(
    <div>
        {data.name}
        {data.description}
    </div>
    );
}

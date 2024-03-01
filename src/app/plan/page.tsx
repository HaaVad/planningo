import { ViewPlan } from "@/components/viewPlan";
import { fictionalPlans } from "../../../testdata/plans";
import { SharePlanDialogue } from "@/components/sharePlanDialogue";

export default function PlanViewTest() {


  return (
      <div className="">
      <h2 >{fictionalPlans[0].title}</h2>
      <p className="">{fictionalPlans[0].description}</p>
      <ViewPlan plan={fictionalPlans[0]} ></ViewPlan>
      </div>
  );
}



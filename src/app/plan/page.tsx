import { ViewPlan } from "@/components/viewPlan";
import { fictionalPlans } from "../../../testdata/plans";
import { SharePlanDialogue } from "@/components/sharePlanDialogue";

export default function PlanViewTest() {


  return (
      <div className="w-full md:w-1/2 mx-auto">
      <h2 >{fictionalPlans[0].name}</h2>
      <p className="">{fictionalPlans[0].description}</p>
      <ViewPlan plan={fictionalPlans[0]} ></ViewPlan>
      </div>
  );
}



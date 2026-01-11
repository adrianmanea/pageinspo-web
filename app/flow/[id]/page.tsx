import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import FlowViewer from "@/components/flow/FlowViewer";

// Mock Data duplicate for Server Component Fallback
// (In a real app, strict shared lib or DB access only)
const MOCK_FLOW = [
  {
    id: 1,
    step_order: 1,
    component: {
      name: "Login Screen",
      code_string: `
        function Component() {
          return (
            <div className="p-8 bg-white min-h-screen flex flex-col justify-center">
              <h1 className="text-2xl font-bold mb-6">Welcome Back</h1>
              <input type="email" placeholder="Email" className="w-full border p-3 rounded mb-4" />
              <button className="w-full bg-black text-white p-3 rounded font-medium">Continue</button>
            </div>
          )
        }
      `,
    },
  },
  {
    id: 2,
    step_order: 2,
    component: {
      name: "Verification Code",
      code_string: `
        function Component() {
          return (
            <div className="p-8 bg-white min-h-screen flex flex-col justify-center">
              <h1 className="text-2xl font-bold mb-2">Enter Code</h1>
              <p className="text-gray-500 mb-6">Sent to john@example.com</p>
              <div className="flex gap-2 mb-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 border rounded bg-gray-50"></div>
                ))}
              </div>
              <button className="w-full bg-black text-white p-3 rounded font-medium">Verify</button>
            </div>
          )
        }
      `,
    },
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  // Await params object (Next.js 14+)
  const { id } = params;

  let steps = [];

  try {
    if (isSupabaseConfigured) {
      const { data } = await supabase
        .from("flow_steps")
        .select("*, component:components(*)")
        .eq("flow_id", id)
        .order("step_order", { ascending: true });
      if (data) steps = data;
    }
  } catch (e) {
    console.error(e);
  }

  // Fallback if no DB or no data found (for demo)
  if (steps.length === 0) {
    steps = MOCK_FLOW;
  }

  return <FlowViewer steps={steps} />;
}

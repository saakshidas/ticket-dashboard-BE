import { Injectable } from '@nestjs/common';

@Injectable()

export class AppService {
private  data = [
  { id: "proposed", title: "Proposed", color: "bg-pink-200/60", cards: [{ id: "p-1", title: "Research pricing tier", meta: "3 subtasks", lines: ["Gather requirements", "Estimate effort"] }, 
  { id: "p-2", title: "Design onboarding flow", meta: "" },], }, { id: "todo", title: "Todo", color: "bg-indigo-200/50", cards: [{ id: "t-1", title: "Create auth API", meta: "API" }, { id: "t-2", title: "Wire up database", meta: "DB" },], },
   { id: "inprogress", title: "In progress", color: "bg-cyan-200/50", cards: [{ id: "i-1", title: "Implement board UI", meta: "3h", lines: ["Layout", "Cards", "Animations"] },], }, { id: "done", title: "Done", color: "bg-emerald-200/50", cards: [{ id: "d-1", title: "Setup project", meta: "init" }], }, { id: "deployed", title: "Deployed", color: "bg-amber-200/50", cards: [{ id: "dp-1", title: "Release v0.1", meta: "live" }], }
];
  

  // getHello(): string {
  //   return 'Hello World!';
  // }

   private tickets = [
    { id: 1, title: 'Login issue', status: 'open' },
    { id: 2, title: 'Payment failed', status: 'closed' },
  ];

  findAll() {
    return this.tickets;
  }
}

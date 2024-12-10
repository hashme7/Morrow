import { Status } from "../../entities_models/status";

const deafulStatus = [
  { "id": "todo", "title": "To Do" },
  { "id": "on-progress", "title": "On Progress" },
  { "id": "completed", "title": "Completed" }
]

export const seedStatus = async()=>{
    for(const status of deafulStatus){
        const exists = await Status.findOne({id:status.id});
        if(!exists){
            await Status.create(status);
        }
    }
}
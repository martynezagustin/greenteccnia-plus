import { User } from "../../../user/user.interface";
import { Definition } from "./definition.interface";
import { Metric } from "./metric.interface";
import { Operative } from "./operative.interface";

export interface RRHHObjective {
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    classification: String,
    status: String,
    progress: Number,
    priority: String,
    snapshots: [String]
}
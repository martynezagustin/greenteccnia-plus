import { User } from "../../../user/user.interface";
import { Definition } from "./definition.interface";
import { Metric } from "./metric.interface";
import { Operative } from "./operative.interface";

export interface RRHHObjective {
    enterpriseId: String,
    definition: Definition,
    metrics: Metric,
    operative: Operative,
    dateStart: Date,
    dateEnd: Date,
    snapshots: [String],
    createdBy: User
}
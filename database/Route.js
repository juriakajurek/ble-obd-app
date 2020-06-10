import {Model} from '@nozbe/watermelondb';
import {field, date} from '@nozbe/watermelondb/decorators';

export default class Route extends Model {
  static table = 'routes';

  @field('pointId') pointId;
  @field('geo') geo;
  @field('acc') acc;
  @field('speed') speed;
  @date('date') date;
  @field('route') route;

  // getTask() {
  //   return {
  //     name: this.name,
  //     completed: this.completed,
  //     date: this.date,
  //   };
  // }
}

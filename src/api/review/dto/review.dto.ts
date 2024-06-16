import { PickType } from '@nestjs/mapped-types';
import { Review } from 'src/common/entities';

export class CreateReviewDto extends PickType(Review, ['rate', 'comment']) {}

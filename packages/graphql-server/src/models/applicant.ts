import {ObjectType, Field, ID, Int} from 'type-graphql'
import {ApplicantModel as RootApplicantModel} from '@reapit/foundations-ts-definitions'

@ObjectType()
export class BuyingType {
  @Field(() => Int, {nullable: true})
  priceFrom?: number;

  @Field(() => Int, {nullable: true})
  priceTo?: number;
}

@ObjectType()
export class Renting {
  @Field({nullable: true})
  moveDate?: string
  
  @Field({nullable: true})
  term?: string
  
  @Field(() => Int, {nullable: true})
  rentFrom?: number
  
  @Field(() => Int, {nullable: true})
  rentTo?: number
  
  @Field({nullable: true})
  rentFrequency?: string
  
  @Field(() => [String], {nullable: true})
  furnishing?: string[]
}

@ObjectType()
export class ExternalArea {
  @Field({nullable: true})
  type?: string

  @Field(() => Int, {nullable: true})
  amountFrom?: number

  @Field(() => Int, {nullable: true})
  amountTo?: number
}

@ObjectType()
export class InternalArea {
  @Field({nullable: true})
  type?: string
  
  @Field(() => Int, {nullable: true})
  amount?: number
}

@ObjectType()
export class Source  {
  @Field(() => ID, {nullable: true})
  id?: string
  
  @Field({nullable: true})
  type?: string
}

@ObjectType()
export class Address {

  @Field({nullable: true})
  buildingName?: string

  @Field({nullable: true})
  buildingNumber?: string

  @Field({nullable: true})
  line1?: string

  @Field({nullable: true})
  line2?: string

  @Field({nullable: true})
  line3?: string

  @Field({nullable: true})
  line4?: string

  @Field({nullable: true})
  postcode?: string

  @Field({nullable: true})
  countryId?: string
}

@ObjectType()
export class Related {
  @Field(() => ID, {nullable: true})
  id?: string
  
  @Field({nullable: true})
  name?: string

  @Field({nullable: true})
  title?: string

  @Field({nullable: true})
  forename?: string

  @Field({nullable: true})
  surname?: string

  @Field({nullable: true})
  type?: string

  @Field({nullable: true})
  homePhone?: string

  @Field({nullable: true})
  workPhone?: string

  @Field({nullable: true})
  mobilePhone?: string

  @Field({nullable: true})
  email?: string
  
  @Field(() => Boolean, {nullable: true})
  fromArchive?: boolean
  
  @Field(() => Address, {nullable: true})
  primaryAddress?: Address;
}

@ObjectType()
export class ApplicantModel implements RootApplicantModel {
  @Field(() => ID, {nullable: true})
  id?: string;

  @Field({nullable: true})
  created?: string;

  @Field({nullable: true})
  modified?: string;

  @Field({nullable: true})
  marketingMode?: string;

  @Field({nullable: true})
  currency?: string;

  @Field({nullable: true})
  active?: string;

  @Field({nullable: true})
  notes?: string;

  @Field({nullable: true})
  lastCall?: string;

  @Field({nullable: true})
  nextCall?: string;

  @Field({nullable: true})
  departmentId?: string;

  @Field({nullable: true})
  solicitorId?: string;

  @Field(() => [String], {nullable: true})
  type?: string[];

  @Field(() => [String], {nullable: true})
  style?: string[];

  @Field(() => [String], {nullable: true})
  situation?: string[];

  @Field(() => [String], {nullable: true})
  parking?: string[];

  @Field(() => [String], {nullable: true})
  age?: string[];

  @Field(() => [String], {nullable: true})
  locality?: string[];

  @Field(() => Int, {nullable: true})
  bedroomsMin?: number;

  @Field(() => Int, {nullable: true})
  bedroomsMax?: number;

  @Field(() => Int, {nullable: true})
  receptionsMin?: number;

  @Field(() => Int, {nullable: true})
  receptionsMax?: number;

  @Field(() => Int, {nullable: true})
  bathroomsMin?: number;

  @Field(() => Int, {nullable: true})
  bathroomsMax?: number;

  @Field({nullable: true})
  locationType?: string;

  @Field(() => [String], {nullable: true})
  locationOptions?: string[];

  @Field({nullable: true})
  archivedOn?: string;

  @Field(() => Boolean, {nullable: true})
  fromArchive?: boolean;

  @Field(() => BuyingType, {nullable: true})
  buying?: BuyingType;

  @Field(() => Renting, {nullable: true})
  renting?: Renting;

  @Field(() => ExternalArea, {nullable: true})
  externalArea?: ExternalArea;

  @Field(() => InternalArea, {nullable: true})
  internalArea?: InternalArea;

  @Field(() => Source, {nullable: true})
  source?: Source;

  @Field(() => [String], {nullable: true})
  officeIds?: string[]
   
  @Field(() => [String], {nullable: true})
  negotiatorIds?: string[]

  @Field({nullable: true})
  _eTag?: string

  @Field(() => [Related], {nullable: true})
  related: Related[];
}

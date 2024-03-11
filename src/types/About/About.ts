import type { Coordinate } from "@yext/types";
import { RichTextV2Description } from "../entities";
import type {
  ComplexImage
} from "@yext/types";
export interface AboutProps {
  aboutCTA: link
  description: RichTextV2Description
  displayMap: boolean
  title: string
  coordinate?: Coordinate
  photo?: ComplexImage
}

export interface link {
  label: string
  uRL: string
}

import {
  isEmail,
  isPhoneNumber,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { SendOtpRequest } from "@modules/auth/dto/request/send-otp.request";

@ValidatorConstraint({ name: "identifier", async: false })
export class IdentifierValidator implements ValidatorConstraintInterface {
  public validate(value: string, args: ValidationArguments): boolean {
    const obj = args.object as SendOtpRequest;
    if (obj.type === "email") {
      return isEmail(value);
    } else if (obj.type === "phone") {
      return isPhoneNumber(value);
    }
    return false;
  }

  public defaultMessage(args: ValidationArguments): string {
    const obj = args.object as SendOtpRequest;
    if (obj.type === "email") {
      return "Identifier must be a valid email address";
    }
    if (obj.type === "phone") {
      return "Identifier must be a valid phone number";
    }
    return "Identifier must be a valid email or phone number";
  }
}

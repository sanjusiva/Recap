import { SetMetadata } from '@nestjs/common';

export const City = (...city: string[]) =>{
    console.log("dec city: ",city)
    return SetMetadata('city', city);
} 
console.log("inside decorator: ",City)
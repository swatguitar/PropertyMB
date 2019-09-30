import {PipeTransform, Pipe} from '@angular/core'
import { AuthenticationService, UserDetails, PropertyDetails } from '../../authentication.service'
@Pipe({
    name: 'amphurFilter'
})
export class AmphurFilterPipe implements PipeTransform {
  
    transform(property: PropertyDetails[], searchAmphur: string): PropertyDetails[] {
        if (!property || !searchAmphur) {
            return property;
        }
        return property.filter(property =>
            property.LAmphur.indexOf(searchAmphur.toLowerCase()) !== -1);
        }
    

}
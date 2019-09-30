import {PipeTransform, Pipe} from '@angular/core'
import { AuthenticationService, UserDetails, PropertyDetails } from '../../authentication.service'
@Pipe({
    name: 'districtFilter'
})
export class DistrictFilterPipe implements PipeTransform {
  
    transform(property: PropertyDetails[], searchDis: string): PropertyDetails[] {
        if (!property || !searchDis) {
            return property;
        }
        return property.filter(property =>
            property.LDistrict.indexOf(searchDis.toLowerCase()) !== -1);
        }
    

}
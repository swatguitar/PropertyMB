import {PipeTransform, Pipe} from '@angular/core'
import { AuthenticationService, UserDetails, PropertyDetails } from '../../authentication.service'
@Pipe({
    name: 'provinceFilter'
})
export class ProvinceFilterPipe implements PipeTransform {
  
    transform(property: PropertyDetails[], searchPro: string): PropertyDetails[] {
        if (!property || !searchPro) {
            return property;
        }
        return property.filter(property =>
            property.LProvince.indexOf(searchPro.toLowerCase()) !== -1);
        }
    

}
import {PipeTransform, Pipe} from '@angular/core'
import { AuthenticationService, UserDetails, PropertyDetails } from '../../authentication.service'
@Pipe({
    name: 'propertyFilter'
})
export class PropertyFilterPipe implements PipeTransform {
    transform(property: PropertyDetails[], searchTerm: string): PropertyDetails[] {
        if (!property || !searchTerm) {
            return property;
        }
        return property.filter(property =>
            property.AnnounceTH.indexOf(searchTerm.toLowerCase()) !== -1 || property.SellPrice.indexOf(searchTerm.toLowerCase()) !== -1);
    }
    

}
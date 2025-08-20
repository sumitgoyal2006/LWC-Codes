import { LightningElement,track,wire} from 'lwc';
import relatedChild from '@salesforce/apex/lightningApexControllerClass.relatedChild';

export default class WireDecoratorLWC extends LightningElement {


       @track accountId;
       contactRecords=undefined;
       error=undefined;
       /*
       contactColumns=[
        {label:'First Name',fieldName:'FirstName'},
        {label:'Last Name',fieldName:'LastName'}
       
       ];
       */


       handleAccountChange(event)
       {
          this.accountId=event.target.value;
        
       }
       
        connectedCallback() //only exeutes when the page loads
        {
            console.log('Connected Callback Function Invoked');
        }
   
       

        @wire(relatedChild,{accId:'$accountId'}) wiredContacts({data,error})
        {
            if(data)
            {
                console.log(data);
                if(data!=[])
                { this.contactRecords=data;
                    this.error=undefined;    
                    console.log('Wire Decorator Invoked');
                }
                else{
                    console.log('No Related Contact');
                }

                   
            }
            else if(error)
            {
                this.error=error;
                this.contactRecords=undefined;
                console.log('No  Related Contact Available');
            }

        }


}

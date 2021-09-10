import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "../../style/Accordion.css"



 const AccordionSample = (props: any) =>  {

  return (
    <div className="accordion-container">
      <Accordion elevation={4} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography >FACILITIES</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {
                props.facilities.length === 0
                ?
                <span> No facilities </span>
                :
                <ul className="accordion-list" >
                    {
                        props.facilities.map((facility: any) => (
                            <li key={facility.code} >
                                <Typography>{facility.name}</Typography> 
                            </li>
                        ))
                    }
                </ul>
            }
            
          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionSample;
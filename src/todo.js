/**
 * Here is the discription of thing which I tried to achieve and 
 * what are the feature which are not there or could be improved.
 * 
 * 1.Present Feature : User can select single seat , or multiple seat from same row. 
 *   Feature Con : However due to time I cannot implement if the user choose different 
 *   row from same type then that feature should also be selected,
 *   Solution : selectedData should be dynamic Object , new object should created
 *   and inserted in the selectedData Object in state
 * 
 * 2. Present Feature : The row can be configured from mock.js based on the
 *    predefined css "left","right","middle"
 *    Improvement : It is static at the moment we have to calcualte the current
 *    margin right by calculating using calc(100vh - width)
 * 
 * 3. Present Feature : Button & Total pay only visible if a seat is selected
 * 
 * 4. Present Feature : User cannot select more than max seat in any row , which
 *    is configurable from state.
 * 
 * 5. Good Practise which i tried to follow , Smart Component & Dumb Component
 *    feature where all the logic is in one component Home component & rest
 *    child are Dumb componentor Pure component which render based upon the 
 *    props recieved 
 * 
 *    Improvement : if the application gets large we have to use context API or
 *    some state management singelton pattern logic
 * 
 *  ** THANK YOU MESSAGE
 * 
 *  I want to say Thanks Saurabh, It was a nice project which pushed me 
 *  a little more due to time constraints.Irrespective of the result It was a 
 *  really great learning experience 
 * 
 * **
 *  
 */
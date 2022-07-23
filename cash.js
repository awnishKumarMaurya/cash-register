const billAmount=document.querySelector("#bill");
const cashAmount=document.querySelector("#cash");
const billform=document.querySelector("#bill-form");
const invalid=document.querySelector(".invalid-input");
const formdata=document.querySelectorAll("#notes-value td");



// event listners
billAmount.addEventListener("focusout", displayCashAmount);
billform.addEventListener("submit",handleFormSubmission);


// functions
function darkmode(){
document.body.classList.add("darkmode");

}
function displayCashAmount() {
    cashAmount.parentElement.classList.add("active");
  }
function handleFormSubmission(event){
  event.preventDefault();
  validateCashAndFillTable(cashAmount.value  ,billAmount.value);
}

function validateCashAndFillTable(cash, bill) {
  const {result,message  } = validateAmounts(cash, bill);
  if (!result) {
    printError(message);
    return;
  }
 if(cash>0){
    const change=cash-bill;
    notes=[2000, 500, 100, 20, 10, 5, 1]
  fillTableWithNotes(notes, change)}
}
function fillTableWithNotes(notes, change){
  for(var i=0;i<notes.length;i++){
    var notesnumber=parseInt(change/notes[i]);
    change=change%notes[i];
    formdata[i].innerText=notesnumber;
    if (change === 0) return;
  }
}
   
  function printError(message){
    invalid.innerText=message;
    invalid.classList.add("active");
  }

function validateAmounts(cash,bill){
    if(!isNaN(bill) && !isNaN(cash)){
        if(parseInt(bill,10)>parseInt(cash,10)){
          return {
            message: "Do you want to wash the plates?",
            result : false,
          }
        }
        return{
          message:"",
          result:true,
        }  
     }
     return{
      message:"invalid input please type a numnber",
      result:false,
     }
  }
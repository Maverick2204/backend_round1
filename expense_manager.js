const readline= require('readline');

const rl= readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const expenses=[];
const dailylimits={};

function addExpense() {
    rl.question('Enter the amount:',(amount) => {
        rl.question('Enter the category:',(category)=>{
            rl.question('Enter the date (DD-MM-YYYY):',(date)=>{
                rl.question('Enter a description:',(description)=>{
                    const expense={
                        amount: parseFloat(amount),
                        category,
                        date,
                        description,
                    };
                    expenses.push(expense);
                    console.log('Expense added successfully.');
                    mainMenu();
                });
            });
        });
    });
}
function listAllExpenses(){
    console.log('list of all expenses:');
    expenses.forEach((expense,index)=> {
        console.log(`Expense: ${index + 1}`);
        console.log(`Amount: ${expense.amount}`);
        console.log(`Category: ${expense.category}`);
        console.log(`Date: ${expense.date}`);
        console.log(`Description: ${expense.description}`);
    });
    mainMenu();
}
function listExpensesByDate(date){
    console.log(`list of expenses on ${date}:`);
    expenses.forEach((expense,index) => {
        if(expense.date == date){
            console.log(`Expense: ${index + 1}`);
            console.log(`Amount: ${expense.amount}`);
            console.log(`Category: ${expense.category}`);
            console.log(`Date: ${expense.date}`);
            console.log(`Description: ${expense.description}`);

        }

    });
    mainMenu();
}
function changeExpenseLimit(){
    rl.question('Enter the new daily expense limit:',(limit) => {
const newLimit = parseFloat(limit);
if (!isNaN(newLimit)){
    dailylimits[new Date().toDateString()]=newLimit;
    console.log(`Daily expense limit set to ${newLimit}`);
} else {
    console.log('Invalid limit . Please enter a valid number.');
}
expenses.forEach((expense,index)=>{
    if(expense.amount > newLimit) {
        console.log(`On ${expense.date} the daily new limit was exceeded\n`)
    
    
    }
    
});
mainMenu();
    });
    
    
}
function deleteExpense(category, date) {
    expenses.forEach((expense,index)=>{
        if (expense.category === category && expense.date === date){
            expenses.splice(index,1);
        }
});
console.log('Expense deleted succesfully.');
mainMenu();
}

function mainMenu(){
    console.log('Expense Manager');
    console.log('1. Add Expense');
    console.log('2. list All Expenses');
    console.log('3. List Expenses of a given date');
    console.log('4. Change Expense Limit');
    console.log('5. Delete Expense');
    console.log('6. Exit');
    rl.question('Select an option:',(option)=>{
        switch(option){
            case '1':
                addExpense();
                break;
            case '2':
                listAllExpenses();
                break;
            case '3':
                rl.question('Enter the date (DD-MM-YYYY): ', listExpensesByDate);
                break;
            case '4':
                changeExpenseLimit();
                break;
            case '5':
                rl.question('Enter the category to delete:',(category)=>{
                    rl.question('Enter the date to delete:',(date)=>{
                        deleteExpense(category,date);
                    });
                });
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Invalid option. Please select a valid option.');
                mainMenu();

        }
    });

}
mainMenu();
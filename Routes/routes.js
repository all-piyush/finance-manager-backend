const router=require('express').Router();
const ratelimit=require('express-rate-limit');
const{login,signup}=require('../Controllers/login');
const{addtransction,updatetransaction,gettransactions,deletetransaction,transactionbycategory,transactionbydate,transactionbytype}=require('../Controllers/entries');
const{summary,summarybydate,summarybyweek,summarybymonth}=require('../Controllers/summary');
const{checkauth,authenticate}=require('../Controllers/authorizations');

const loginlimiter=ratelimit({
    windowMs:15*60*1000,
    max:5,
    message:"Too Many Login Attempts. Please Try Again After Some Time."
})
const getdatalimiter=ratelimit({
    windowMs:15*60*1000,
    max:100,
    message:"Too Many Fetch Attempts. Please Try Again After Some Time."
})
const setdatalimiter=ratelimit({
    windowMs:15*60*1000,
    max:50,
    message:"Too Many Update Attempts. Please Try Again After Some Time."
})
router.post('/login', loginlimiter,login);
router.post('/signup',loginlimiter,signup);

router.post('/already-loggedin',checkauth(['viewer','analyst','admin']),getdatalimiter,authenticate);
router.get('/alltransactions',checkauth(['viewer','analyst','admin']),getdatalimiter,gettransactions);
router.get('/transactions-by-date',checkauth(['viewer','analyst','admin']),getdatalimiter,transactionbydate);
router.get('/transactions-by-category',checkauth(['viewer','analyst','admin']),getdatalimiter,transactionbycategory);

router.get('/transactions-by-type',checkauth(['viewer','analyst','admin']),getdatalimiter,transactionbytype);
router.get('/summary',checkauth(['analyst','admin']),getdatalimiter,summary);
router.get('/summary-by-date',checkauth(['analyst','admin']),getdatalimiter,summarybydate);
router.get('/summary-by-week',checkauth(['analyst','admin']),getdatalimiter,summarybyweek);
router.get('/summary-by-month',checkauth(['analyst','admin']),getdatalimiter,summarybymonth);

router.post('/add-transaction',checkauth(['admin']),setdatalimiter,addtransction);
router.patch('/update-transaction/:id',checkauth(['admin']),setdatalimiter,updatetransaction);
router.delete('/delete-transaction/:id',checkauth(['admin']),setdatalimiter,deletetransaction);

module.exports=router;
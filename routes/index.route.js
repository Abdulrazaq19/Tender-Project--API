const express = require("express");
const app = express();
const indexRoutes = express.Router();
const Sequelize = require("sequelize");
const sequelize = require("../DB");
const Op = require("sequelize").Op;
const Bid = require("../models/bid.js");
const User = require("../models/User.js");
const Contact = require("../models/contact.js");
const Offer = require("../models/offer.js");
const Category = require("../models/category.js");
const Notice = require("../models/notice.js");
const Complaint = require("../models/complaint.js");
indexRoutes.get('/',(req,res,next) =>
{

    let category = [
        { name: 'الكترونيات' },
        { name: 'توريد' },
    ];
    
let complaint = [
    {id:1, describtion: 'Tai chi in the morning',bidId:1 },
    {id:2, describtion: 'Visited friend',bidId:3 },
    {id:3, describtion: 'Went to cinema',bidId:2 }
]
let contact = [
    { name: 'Tai chi ' ,email:"3n3abdo@gmail.com",message:"T chi in the morning"},
    { name: 'Visi riend',email:"abdonorab@gmail.com",message:"T chi in the morning" },
    { name: 'Weni inewi',email:"abdunorab@gmail.com",message:"T chi in the morning" },
    { name: 'Lina tima' ,email:"abdu.norab@gmail.com",message:"T chi in the morning"},
    { name: 'pascal Div' ,email:"ya3bdu@gmail.com",message:"T chi in the morning"},
    { name: ' amit shoukla',email:"avf.agy@gmail.com",message:"T chi in the morning" },
];
let notice = [
    { title:"أغلاق العطاء",describtion:"تم أغلاق العطاء رقم 1 و سيتم الاعلان عن العطاء المختار قريبا"},
    { title:"أعلان الفائز",describtion:"تم أختيار العرض الفائز في العطاء رقم 1 و سيتم التواصل معه عبر البريد الالكتروني" },
    { title:"أغلاق العطاء",describtion:"تم أغلاق العطاء رقم 2 و سيتم الاعلان عن العطاء المختار قريبا" },
    { title:"أغلاق العطاء",describtion:"تم أغلاق العطاء رقم 3 و سيتم الاعلان عن العطاء المختار قريبا"}
];
    
let bid = [
    {id:1, title: 'توريد مياه شرب',local:"الخرطوم ",budget:50000,domain:"الكترونيات",endDate:"2022-03-02", bidPaper:"bid.jpg",specfication:"أطلع علي ورقه العطاءلمزيد من المعلومات",description:"ن طرح عطاء توريد أدوية وفيتامينات ويمكن للشركات ذات الخبرة والاختصاص فقط الحصول على العطاء",published:false,CategoryId:1 },   
    {id:2, title: 'توريد مواد بناء وحدة معالجة مياه',local:"بحري",budget:50000,domain:"الكترونيات",endDate:"2022-03-20",specfication:"أطلع علي ورقه العطاءلمزيد من المعلومات",bidPaper:"bid.jpg",description:"ن طرح عطاء توريد أدوية وفيتامينات ويمكن للشركات ذات الخبرة والاختصاص فقط الحصول على العطاء",published:true,CategoryId:1 },
    {id:3, title: 'توفير وتركيب معدات لإعادة تأهيل محطة مياه',local:"بحري",budget:50000,domain:"الكترونيات",endDate:"2022-03-23",specfication:"أطلع علي ورقه العطاءلمزيد من المعلومات",bidPaper:"bid.jpg",description:"ن طرح عطاء توريد أدوية وفيتامينات يمكن للشركات الان التقديم الي العطاء",published:true,CategoryId:1 },
    {id:4, title: 'توريد أدوات مدرسية',local:"بحري",budget:50000,domain:"توريد",endDate:"2022-03-24",specfication:"أطلع علي ورقه العطاءلمزيد من المعلومات",bidPaper:"bid.jpg",description:"نعلن عن طرح عطاء توريد محول قدرة 15 لصالج وزاره الماليه ",published:true,CategoryId:2 }, 
    { id:5,title: 'VDI شراء و توريد',local:"بحري",budget:50000,domain:"الكترونيات",endDate:"2022-03-25",specfication:"لا مواصفات خاصة",bidPaper:"bid.jpg",description:" تعلن  عن طرح عطاء توريد و تركيب و برمجة و تشغيل أجهزة Thin Client و تجهيز البنية التحتية VDI "
     ,published:true,CategoryId:1 },
    { id:6,title: 'تأهيل مرافق عامة',local:"بحري",budget:50000,domain:"الكترونيات",endDate:"2022-03-27",specfication:"لا مواصفات خاصة",bidPaper:"bid.jpg",description:"نعلن عن طرح عطاء صيانه المبني الرئيسي لـ وزاره الماليه ",published:true,CategoryId:1 },
    { title: 'طرح عطاء توريد محول قدرة 15 م.ف.أ',local:"الخرطوم",budget:500000,domain:"الكترونيات",endDate:"2022-03-28",specfication:"ا مواصفات خاصة",bidPaper:"bid.jpg",description:"نعلن عن طرح عطاء توريد محول قدرة 15 لصالج وزاره الماليه ",published:true,CategoryId:1 },
   
];


let user =[
{id:1,name:"manger",orgName:"none",EstablishDate:"2022-03-05",address:"الخرطوم -ابوجنزير",job:"manger",mobile:'0120120120',taxFileNo:1234567,CommLicenseNo:1234567, username: "admin",email: "3n3abdo@gmail.com",Password:"ad1234"},
{id:2,name:" محمد أحمد",orgName:"الشركه للادوات الكهربابئه",EstablishDate:"2022-03-05",address:"الخرطوم -شارع الحريه",job:"manger",mobile:'0120120120',taxFileNo:1234567,CommLicenseNo:1234567, username: "user01",email: "ya3bdu@gmail.com",Password:"ad1234"},
{id:3,name:"حسن محمد",orgName:"المتحده للتوريد والاستيراد ",EstablishDate:"2022-03-08",address:"الخرطوم -السوق العربي",job:"manger",mobile:'0120120120',taxFileNo:1234567,CommLicenseNo:1234567, username: "user02",email: "email@gmail.com",Password:"ad1234"},
{id:4,name:"حسين ابوعلي",orgName:"شيكان للادوات والمعدات الثقيله",EstablishDate:"2022-03-08",address:"الخرطوم -شارع الحريه",job:"manger",mobile:'0120120120',taxFileNo:1234567,CommLicenseNo:1234567, username: "user03",email: "email1@gmail.com",Password:"ad1234"},
{id:5,name:"أميل فخري",orgName:"Emil Trade",EstablishDate:"2022-03-08",address:"الخرطوم -شارع البلديه",job:"manger",mobile:'0120120120',taxFileNo:1234567,CommLicenseNo:1234567, username: "user04",email: "email2@gmail.com",Password:"ad1234"},
]
let offer = [
    {id:1, name:"أميل حمدي",orgName: 'أميل للادوات الكهربابئه',mobile:0911110012,taxNo:84739,commerNo:948379,email:"3n3abdo@gmail.com",website:"example.com",time:"2022-03-08", fbUrl:"fb.com/editorMarca",ACcost	:40000,ACtime:"2022-03-28",detail:"أعتمادا  علي خبرتنا وتفردنا في المجال",bidId:3,UserId:2 },   
    {id:2, name:"محمد أحمد",orgName: 'الشركه للادوات الكهربابيه',mobile:0912110012,taxNo:84739,commerNo:948379,email:"avf.agy@gmail.com",website:"example.com",time:"2022-03-09", fbUrl:"fb.com/editorMarca",ACcost	:41000,ACtime:"2022-03-27",detail:"أعتمادا  علي خبرتنا وتفردنا في المجال",bidId:3,UserId:3 },  
    {id:3, name:"حسن محمد",orgName: 'المتحده للتوريد والاستيراد الكهربائيه',mobile:0913110012,taxNo:84739,commerNo:948379,email:"ya3bdu@gmail.com",website:"example.com",time:"2022-03-28", fbUrl:"fb.com/editorMarca",ACcost	:45000,ACtime:"2022-03-27",detail:"أعتمادا  علي خبرتنا وتفردنا في المجال",bidId:3,UserId:4 },  
    {id:4, name:"حسين ابوعلي ",orgName: 'شيكان للادوات والمعدات الثقيله',mobile:0914110012,taxNo:84739,commerNo:948379,email:"example4@domian.com",website:"example.com",time:"2022-03-10", fbUrl:"fb.com/editorMarca",ACcost	:43000,ACtime:"2022-03-29",detail:"أعتمادا  علي خبرتنا وتفردنا في المجال",bidId:3,UserId:5 },  
    {id:5, name:"أميل حمدي",orgName: 'أميل للادوات الكهربابئه',mobile:0911110012,taxNo:84739,commerNo:948379,email:"example1@domian.com",website:"example.com",time:"2022-03-08", fbUrl:"fb.com/editorMarca",ACcost	:40000,ACtime:"2022-03-28",detail:"أعتمادا  علي خبرتنا وتفردنا في المجال",bidId:4,UserId:2 },   
    {id:6, name:"محمد أحمد",orgName: 'الشركه للادوات الكهربابيه',mobile:0912110012,taxNo:84739,commerNo:948379,email:"example2@domian.com",website:"example.com",time:"2022-03-09", fbUrl:"fb.com/editorMarca",ACcost	:41000,ACtime:"2022-03-27",detail:"أعتمادا  علي خبرتنا وتفردنا في المجال",bidId:4,UserId:3 },  
    {id:7, name:"حسن محمد",orgName: 'المتحده للتوريد والاستيراد الكهربائيه',mobile:0913110012,taxNo:84739,commerNo:948379,email:"example3@domian.com",website:"example.com",time:"2022-03-28", fbUrl:"fb.com/editorMarca",ACcost	:45000,ACtime:"2022-03-27",detail:"أعتمادا  علي خبرتنا وتفردنا في المجال",bidId:4,UserId:4 },  
    {id:8, name:"حسين ابوعلي ",orgName: 'شيكان للادوات والمعدات الثقيله',mobile:0914110012,taxNo:84739,commerNo:948379,email:"example4@domian.com",website:"example.com",time:"2022-03-10", fbUrl:"fb.com/editorMarca",ACcost	:43000,ACtime:"2022-03-29",detail:"أعتمادا  علي خبرتنا وتفردنا في المجال",bidId:4,UserId:5 },  
     
];






sequelize.sync().then(() => {
    Category.bulkCreate(category).then(() => {
        console.log('notes created');
    }).catch((err) => {
        console.log('failed to create notes');
        console.log(err);
    })
Notice.bulkCreate(notice).then(()=>
{
    console.log("notice create")
}).catch((err) => {
    console.log('failed to create notice');
    console.log(err);
})

Contact.bulkCreate(contact).then(()=>
{
    console.log("contact create")
}).catch((err) => {
    console.log('failed to create notice');
    console.log(err);
})
User.bulkCreate(user).then(()=>
{
    console.log("user create")
}).catch((err) => {
    console.log('failed to create complaint');
    console.log(err);
})
Bid.bulkCreate(bid).then(()=>
{
    console.log("user create")
}).catch((err) => {
    console.log('failed to create complaint');
    console.log(err);
})
setTimeout(() => {
    
Complaint.bulkCreate(complaint).then(()=>
{
    console.log("complaint create")
}).catch((err) => {
    console.log('failed to create complaint');
    console.log(err);
})
Offer.bulkCreate(offer).then(()=>
{
    console.log("offer create")
}).catch((err) => {
    console.log('failed to create offer');
    console.log(err);
})
res.send("done !")
}, 1000);
})
})
module.exports=indexRoutes;
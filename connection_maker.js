var bigData = [];
var vocabulary = {};
var DATA;
var seconds = 15;
var sizes = {
    //window sizes
    windowWidth:window.innerWidth,
    windowHeight:innerHeight,
    //big cards sizes
    rectWidth:300,
    rectHeight:150,
    //space between cards
    spaceBetweenRectX:400,
    spaceBetweenRectY:50,
    //little card sizes
    miniRectHeight:70,
    miniRectWidth:250,
    //little space between rects
    miniSpaceBetweenRectY:5,
    //space between links
    spaceBetweenLink:6,
    //link sizes
    linkWidth:1,
    linkWidthHighlighted:3,

    zoomButtonSize:50,
    spaceBetweenZoomButtons:10,

    rectStrokeWidth:2,
    rectStrokeWidthHighlighted:4,

    //legend sizes

    legendWidth:300,

}
const graphType = {
    cards:1,
    circles:2,
}
var typeOfGraph = graphType.circles;
//all models
const models = {
    types:{
        root:"root",
        company:"company",
        founder:"founder",
        company_founder:"company_founder",
        root_individual:"root_individual",
        director:"director",
        entrepreneur:"entrepreneur",
        root_entrepreneur:"root_entrepreneur",
        individual:"individual",
        company_branch:"company_branch",
        company_head:"company_head",
    }
};
const lowOpacity = .3;

const startScale=.75;

const colors = {
    "root":"#587AB0",
    "root_individual":"#587AB0",
    "root_entrepreneur":"#587AB0",
    "company":"gray",
    "founder":"#F4B084",
    "director":"#A9D08E",
    "entrepreneur":"gray",
    "company_founder":"#F4B084",
    "individual":"DarkOrchid",
    "company_branch":"gray",
    "company_head":"gray",
    "notActive":"lightgray",
    "normal":"#EDF8F9",
    "problem":"#F9ECE9",
}

const images = {
    organisation:"https://img.icons8.com/ultraviolet/1000/000000/organization.png",
    director:"https://img.icons8.com/ultraviolet/1000/000000/businessman.png",
    humanFounder:"https://img.icons8.com/ultraviolet/1000/000000/manager.png",
    companyBranch:"https://img.icons8.com/ultraviolet/1000/000000/related-companies.png",
    entrepreneur:"https://img.icons8.com/ultraviolet/1000/000000/small-business.png"


}




var body = d3.select('body');

//create canvas
var svg = body
    .style("margin",0)
    .style("height",sizes.windowHeight)
    .style("width",sizes.windowWidth)
    .append('svg')
    .style("height",sizes.windowHeight)
    .style("width",sizes.windowWidth)
    .attr("id","svgId");
//create container
var container = svg.append("g")
    .attr("class","container")
    .attr("id","graphContainer")
    .attr("x",100)
    .attr("y",100)
    .attr("transform","translate("+100+","+100+") scale("+startScale+")");
//create extra card
var extraCard = body.append("div").attr("id","extraCard");


//change graphs
function toogleGraph(){
    container.selectAll("*").remove();
    container.attr("width",1000)
        .attr("x",100)
        .attr("y",100)
        .attr("transform","translate("+100+","+100+") scale("+startScale+")");
    if(typeOfGraph==graphType.cards){
        renderCircleGraph(json)
        typeOfGraph=graphType.circles;
    }
    else{
        renderTreeGraph(json);
        typeOfGraph=graphType.cards;
    }

}
//render any graph
function renderGraph(){
    container.selectAll("*").remove();

    if(!container.attr("transform")){
        alert("render good")
        container.attr("width",1000)
            .attr("x",100)
            .attr("y",100)
            .attr("transform","translate("+100+","+100+") scale("+startScale+")");
    }

    if(typeOfGraph = graphType.cards){
        renderTreeGraph(json);
    }
    else{
        renderCircleGraph(json);
    }

}
//pagination show more
function showMore(){
    dataFormatter2(bigData);
}
//type to russ
function getRussType(type){
    switch (type) {
        case models.types.root:
            return "Искомая компания"
            break
        case models.types.company:
            return"Компания"
            break
        case models.types.founder:
            return "Учредитель"
            break
        case models.types.root_individual:
            return "Искомое физическое лицо"
            break
        case models.types.company_founder:
            return "Компания учередитель"
            break
        case models.types.director:
            return "Руководитель"
            break
        case models.types.entrepreneur:
            return "ИП"
            break
        case models.types.root_entrepreneur:
            return "Искомый ИП"
            break
        case models.types.individual:
            return "Физическое лицо"
            break
        case models.types.company_head:
            return "Главный офис"
            break
        case models.types.company_branch:
            return "Филиал"
            break
        default:
            console.log("undefinded type", "error in showExtraCard function");
            return "Неизвестный тип"
            break
    }
}
//return text without undefinded
function returnText(text){
    if(text){
        return text;
    }
    return "Не найдено";
}
//index region -> string
function getRegion(num){
    switch (num){
        case 1:
            return "город Алматы"
        break
        case 2:
            return "город Нур-Султан"
        break
        case 3:
            return "город Шымкент"
        break
        case 4:
            return "Акмолинская область"
        break
        case 5:
            return "Актюбинская область"
        break
        case 6:
            return "Алматинская область"
        break
        case 7:
            return "Атырауская область"
        break
        case 8:
            return "Восточно-Казахстанская область"
        break
        case 9:
            return "Жамбылская область"
        break
        case 10:
            return "Западно-Казахстанская область"
        break
        case 11:
            return "Карагандинская область"
        break
        case 12:
            return "Костанайская область"
        break
        case 13:
            return "Кызылординская область"
        break
        case 14:
            return "Мангыстауская область"
        break
        case 15:
            return "Павлодарская область"
        break
        case 16:
            return "Северо-Казахстанская область"
        break
        case 17:
            return "Турскестанская область"
        break
        default:
            return undefined
        break
    }
}
//index krp -> string company size
function getCompanySize(num){
    switch (num){
        case 305:
            return "Крупные предприятия (251-500) (от 251 до 500 чел.)"
        break
        case 310:
            return "Крупные предприятия (501-1000) (от 501 до 1000 чел.)"
        break
        case 140:
            return "Малые предприятия (31-40) (от 31 до 40 чел.)"
        break
        case 150:
            return "Малые предприятия (41-50) (от 41 до 50 чел.)"
        break
        case 220:
            return "Средние предприятия (151-200) (от 151 до 200 чел.)"
        break
        case 225:
            return "Средние предприятия (201-250) (от 201 до 250 чел.)"
        break
        case 115:
            return "Малые предприятия (11-15) (от 11 до 15 чел.)"
        break
        case 130:
            return "Малые предприятия (21-30) (от 21 до 30 чел.)"
        break
        case 105:
            return "Малые предприятия (<= 5) (от 0 до 5 чел.)"
        break
        case 110:
            return "Малые предприятия (6 - 10) (от 6 до 10 чел.)"
        break
        case 215:
            return "Средние предприятия (101-150) (от 101 до 150 чел.)"
        break
        case 311:
            return "Крупные предприятия (>1000) (от 1001 до 999999 чел.)"
        break
        case 160:
            return "Малые предприятия (51-100) (от 51 до 100 чел.)"
        break
        case 120:
            return "Малые предприятия (16-20) (от 16 до 20 чел.)"
        break
        default:
            return undefined
        break
    }
}

//extra cards methods
function showExtraCard(d){

    var russType = getRussType(d.type)

    main='<div class="extraCardType">' +
        '<h2 class="extraCardType">'+russType+'</h2>' +
        '</div>'+
        '<div class="extraCardInfo">';

    if(d.type == models.types.company|| d.type == models.types.root||d.type==models.types.company_founder||d.type == models.types.company_branch||d.type==models.types.company_head){
        main+='<h2 class="extraCardInfo"><span class="extraCardBold">Название: </span>'+returnText(d.name)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">БИН: </span>'+returnText(d.biin)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">Дата регистрации: </span>'+returnText(d.date) +'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">Регион: </span>'+returnText(d.region)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">Адрес: </span>'+returnText(d.adress)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">Размер предприятия: </span>'+returnText(d.company_size)+'</h2>';
    }
    else if(d.type==models.types.root_entrepreneur||d.type==models.types.entrepreneur){
        main+='<h2 class="extraCardInfo"><span class="extraCardBold">Название: </span>'+returnText(d.name)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">ИИН: </span>'+returnText(d.biin)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">Дата регистрации: </span>'+returnText(d.date) +'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">Регион: </span>'+returnText(d.region)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">Адрес: </span>'+returnText(d.adress)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">Размер предприятия: </span>'+returnText(d.company_size)+'</h2>';
    }
    else{
        main+='<h2 class="extraCardInfo"><span class="extraCardBold">ИМЯ: </span>'+returnText(d.name)+'</h2>'+
            '<h2 class="extraCardInfo"><span class="extraCardBold">ИИН: </span>'+returnText(d.biin)+'</h2>';
    }
    main+='</div>';

    extraCard.classed("extraCard",true)
        .style("display","block")
        .style("opacity",.9)
        .style("left", (d3.event.pageX + 20 ) + "px")
        .style("top", (d3.event.pageY+20) + "px");

    extraCard.html(main)
}
function removeExtraCard(){
    try{extraCard.style("display","none")}
    catch (e) {
        console.log("error in remove card",e)
    }
}
function toolBar(){

    var paginationContainer = body.append("a")
        .attr("class","paginationButton")
        .on("click",()=>renderGraph());
    var paginationImageContainer = paginationContainer.append("div").attr("class","paginationImageContainer");
    paginationImageContainer.append("span");
    paginationImageContainer.append("span");

    // var paginationImage = paginationContainer.append("img")
    //     .attr("src","https://raw.githubusercontent.com/tabler/tabler-icons/9a83520adc619d93faea46b0cfdd2259a963558c/icons/arrow-narrow-right.svg")
    //     .attr("class","paginationButton");

    var paginationContainerText = paginationContainer.append("h3")
        .attr("class","paginationButton")
        .text("Показать еще связи")
    // var paginationButton = paginationContainer.append("a")
    //     .attr("class","paginationButton");
//tool bar header
    var toolBar = body.append("div")
        .attr("class","toolbar")
    //zoom buttons
    var bigZoomButton = toolBar.append("div")
        .attr("id","bigZoomButton")
        .classed("zoomButton plusButton",true)
        .on("dblclick.zoom",null)
        .style("width",sizes.zoomButtonSize+"px")
        .style("height",sizes.zoomButtonSize+"px")
        .style("right",(sizes.zoomButtonSize+2*sizes.spaceBetweenZoomButtons)+"px")
    bigZoomButton.append("img")
        .attr("src","https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/zoom-in.svg")
        .attr("alt","icon title")


    var lilZoomButton = toolBar.append("div")
        .classed("zoomButton minusButton",true)
        .attr("id","lilZoomButton")
        .attr("transform","translate("+(sizes.windowWidth-(sizes.zoomButtonSize+sizes.spaceBetweenZoomButtons))+","+(sizes.spaceBetweenZoomButtons+sizes.zoomButtonSize)+")")
        .on("dblclick.zoom",null)
        .style("width",sizes.zoomButtonSize+"px")
        .style("height",sizes.zoomButtonSize+"px")
        .style("right",sizes.spaceBetweenZoomButtons+"px")
    // .append("span")
    lilZoomButton.append("img")
        .attr("src","https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/zoom-out.svg")
        .attr("alt","icon title")

    var saveButton = toolBar.append("div")
        .classed("zoomButton saveButton",true)
        .on("dblclick.zoom",null)
        .style("width",sizes.zoomButtonSize+"px")
        .style("height",sizes.zoomButtonSize+"px")
        .style("right",(2*sizes.zoomButtonSize+3*sizes.spaceBetweenZoomButtons)+"px")
        .on("click",saveSVG)

    saveButton.append("img")
        .attr("src","https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/download.svg")
        .attr("alt","icon title")



    //legend button
    var legendButton = toolBar.append("div")
        .classed("zoomButton legendButton openedLegend",true)
        .on("dblclick.zoom",null)
        .style("width",sizes.zoomButtonSize+"px")
        .style("height",sizes.zoomButtonSize+"px")
        .style("right",(3*sizes.zoomButtonSize+4*sizes.spaceBetweenZoomButtons)+"px")
        .on("click",legendButtonClick);


    var changeGraphButton = toolBar.append("div")
        .classed("zoomButton changeGraphButton",true)
        .on("dblclick.zoom",null)
        .style("width",sizes.zoomButtonSize+"px")
        .style("height",sizes.zoomButtonSize+"px")
        .style("right",(4*sizes.zoomButtonSize+5*sizes.spaceBetweenZoomButtons)+"px")
        .on("click",async function (){
            toogleGraph();
            rotateImage.classed("rotateImage",true);
            rotateImage.attr("src",typeOfGraph!=graphType.circles?"https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/git-fork.svg":"https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/subtask.svg")

            setTimeout(function(){
                rotateImage.classed("rotateImage",false)
            }, 500);

        });

    var rotateImage = changeGraphButton.append("img")
        .attr("src",typeOfGraph==graphType.circles?"https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/git-fork.svg":"https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/subtask.svg")
        .attr("alt","icon title");

    var searchByNameContainer = toolBar.append("div")
        .attr("class","searchByName");

    var searchImg = searchByNameContainer.append("img")
        .attr("class","searchImg")
        .attr("src","https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/search.svg")
        .attr("alt","icon search")

    var searchBar = searchByNameContainer.append("input")
        .attr("id","search")
        .classed("openSearch",true)
        .attr("type","text")
        .attr("placeholder","Поиск по названию")
        .attr("autocomplete","off")

    var seacrhClearButton = searchByNameContainer.append("img")
        .attr("id","clearSearch")
        .attr("src","https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/x.svg")
        .attr("alt","icon clear")
        .classed("clearSearchBarInvisible",true);


    //save svg
    function saveSVG(){
        var scaleValue=1;
        try{scaleValue = d3.select("#graphContainer").attr("transform").split("scale(")[1].split(")")[0]}
        catch {}

        var obj = document.getElementById("graphContainer");
        var objCopy = obj.cloneNode(true);
        if(graphType.cards==typeOfGraph) {
            objCopy.setAttribute("transform", "translate(0,0)");
        }
        else{
            let oldX = parseFloat(d3.select("#graphContainer").attr("transform").split("(")[1].split(",")[0]);
            let oldY = parseFloat(d3.select("#graphContainer").attr("transform").split("(")[1].split(",")[1].split(")")[0]);
            let containerY = (obj.getBoundingClientRect().top*(-1)+oldY)/scaleValue;
            let containerX = (obj.getBoundingClientRect().left*(-1)+oldX)/scaleValue;
            objCopy.setAttribute("transform", "translate("+containerX+","+containerY+")");
        }

        let h = obj.getBoundingClientRect().height/scaleValue;
        let w = obj.getBoundingClientRect().width/scaleValue;


        let newSvg = body.append("svg")
            .attr("id","newSvg")
            .attr("width",w+200)
            .attr("height",h+200)

        let newSvgDoc = document.getElementById("newSvg");
        newSvgDoc.appendChild(objCopy);


        var serializer = new XMLSerializer();
        var objStr = serializer.serializeToString(document.getElementById("newSvg"));


        let imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(objStr)));


        newSvg.remove();


        var dlLink = document.createElement('a');
        dlLink.download = "connection graph";
        dlLink.href = imgsrc;

        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }
    //click on legend button method
    function legendButtonClick(){
        if(legendButton.classed("openedLegend")){
            legendButton.classed("openedLegend",false)
            //legendCard.style("transform","translateX("+(sizes.legendWidth+1)+"px)")
            legendCard.style("right","-"+(sizes.legendWidth+1)+"px")
            //legendCard.style("width",0)
        }
        else{
            legendButton.classed("openedLegend",true)
            legendCard.style("right","0px")
        }
    }

    legendButton.append("img")
        .attr("src","https://raw.githubusercontent.com/tabler/tabler-icons/9113749e27e6273a421cbcaceaf15c9f15824890/icons/align-left.svg")
        .attr("alt","icon title")


    //creating legend card
    var legendCard = body.append("div").on("click",legendButtonClick);
    function showLegendCard(){
        main = "<div class=legend id=legend style=width:"+sizes.legendWidth+"px >"+
            '<h5>'+"<div class=legendSpan style=background-color:"+colors[models.types.company]+"></div>Связи от компаний и ИП"+'</h5>'+
            '<h5>'+"<div class=legendSpan style=background-color:"+colors[models.types.founder]+"></div>Связи от учредителей"+'</h5>'+
            '<h5>'+"<div class=legendSpan style=background-color:"+colors[models.types.director]+"></div>Связи от руководителей"+'</h5>'+
            '<h5>'+"<div class=legendSpan style=background-color:"+colors[models.types.root]+"></div>Связи от искомого"+'</h5>'+
            '</div>'
        legendCard.attr("class","legendContainer").attr("id","legendCard")
        legendCard.html(main);
    }
    showLegendCard();


}

function dataFormatter2(data){
    var unicId = 0;
    var keyNode = {};
    var root = null;
    if(vocabulary==undefined){
        vocabulary={};
    }
    console.log(data)
    if(data.length<2){
        alert("Нет данных")
    }

    //show toolbar
    toolBar();

    function rootTypeById(id){
        if(id) {
            var type = id.split("/")[0];
            if (type == "entrepreneurs") {
                return models.types.root_entrepreneur;
            } else if (type == "individuals") {
                return models.types.root_individual;
            }
            return models.types.root;
        }
        console.log("check data formatter")
        return "undefindedn type"
    }
    function typeByType(type){
        if(type==models.types.director||type==models.types.company_founder||type==models.types.founder){
            return models.types.company
        }
        else if(type==models.types.company_branch){
            return models.types.company_head
        }
        console.log("CHECK TYPE BY TYPE")
        return "???"
    }
    function directType(type){
        if(type=="name_director"){
            return models.types.director;
        }
        return type;
    }
    data.forEach(node=>{
        if(node.v==null){
            return ;
        }
        if(vocabulary[node.v._id]==undefined){
            vocabulary[node.v._id]={};
        }
        let vocabularyObject = vocabulary[node.v._id];
        if (vocabularyObject.childrenFounders == undefined) {
            vocabularyObject.childrenFounders = [];
        }
        if (vocabularyObject.childrenKeysFounders == undefined) {
            vocabularyObject.childrenKeysFounders = [];
        }
        if(node.e!=null) {
            if (node.v._id==node.e._from) {
                try {
                    let parentKey = node.e._to;
                    let child = {
                        "key": node.v._id,
                        "name": vocabularyObject.name||node.v.name,
                        "type": node.e.type,
                        "date": vocabularyObject.date_registration,
                        "adress": vocabularyObject.legal_address,
                        "region": getRegion(vocabularyObject.id_region),
                        "company_size": getCompanySize(vocabularyObject.id_krp),
                        "biin": node.v._id.split("/")[1],
                        "active": vocabularyObject.active,
                        "trustworthy": vocabularyObject.trustworthy,
                        "parentName": vocabulary[parentKey].name,
                    }

                    if (!vocabulary[parentKey].childrenKeysFounders.includes(child.name + child.type)&&node.e._from!=node.e._to) {
                        if(child.type==models.types.director){
                            vocabulary[parentKey].childrenFounders.unshift(child);
                        }
                        else{
                            vocabulary[parentKey].childrenFounders.push(child);
                        }
                        vocabulary[parentKey].childrenKeysFounders.push(child.name + child.type);
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            else {
                let child = {
                    "key": node.e._from,
                    "name": vocabulary[node.e._from].name,
                    "type": node.e.type,
                    "date": vocabulary[node.e._from].date_registration,
                    "adress": vocabulary[node.e._from].legal_address,
                    "region": getRegion(vocabulary[node.e._from].id_region),
                    "company_size": getCompanySize(vocabulary[node.e._from].id_krp),
                    "biin": node.e._from.split("/")[1],
                    "active": vocabulary[node.e._from].active,
                    "trustworthy": vocabulary[node.e._from].trustworthy,
                    "parentName": vocabularyObject.name,
                }
                let childCopy = {...child};
                if(childCopy.type==models.types.director||childCopy.type==models.types.founder){
                    if(vocabularyObject.fullname_director==childCopy.name){
                        childCopy.type=models.types.director;
                    }
                    else{
                        childCopy.type=models.types.founder;
                    }
                }
                if (!vocabularyObject.childrenKeysFounders.includes(childCopy.name + childCopy.type)) {

                    vocabularyObject.childrenFounders.push(childCopy);
                    vocabularyObject.childrenKeysFounders.push(childCopy.name + childCopy.type);
                }

            }
        }
    })

    data.forEach(node=>{
        if(node.v==null){
            console.log("NULL",node)
            return ;
        }
        let vocabularyObject = vocabulary[node.v._id];
        if(vocabularyObject.childrenFounders!=undefined && vocabularyObject.childrenKeysFounders!=undefined && vocabularyObject.founders!=undefined && !vocabularyObject.founders.includes(null)){
            vocabularyObject.founders.forEach(f=>{
                if(!vocabularyObject.childrenKeysFounders.includes(f + models.types.founder) && !vocabularyObject.childrenKeysFounders.includes(f + models.types.company_founder)){
                    vocabulary[node.v._id].childrenFounders.push({
                        "name":f,
                        "id":unicId++,
                        "type":models.types.founder,
                    })
                }
            })
        }
        if(vocabularyObject==undefined){
            vocabularyObject={childrenFounders:[],childrenKeysFounders:[]};
        }
        if(root==null){
            root={
                "name":vocabularyObject.name,
                "id":unicId++,
                "level":1,
                "type":rootTypeById(node.v._id),
                "key":node.v._id,
                "date":vocabularyObject.date_registration,
                "adress":vocabularyObject.legal_address,
                "region":getRegion(vocabularyObject.id_region),
                "company_size":getCompanySize(vocabularyObject.id_krp),
                "biin":node.v._id.split("/")[1],
                "active":vocabularyObject.active,
                "trustworthy":vocabularyObject.trustworthy,
                "foundernumber":vocabularyObject.childrenKeysFounders.length-1,
            }
            root.children = [];
            vocabularyObject.childrenFounders.forEach(ch=>{
                ch["level"]=root.level;
                ch["id"]=unicId++;
                if(ch.type==models.types.director){
                    root.children.unshift({...ch})
                }
                else{
                    root.children.push({...ch});
                }

            })
            vocabularyObject.children=[];
            vocabularyObject.childrenKeys=[];
            keyNode[node.v._id]=root;
            return
        }
        if(keyNode[node.v._id == node.e._to ? node.e._from : node.e._to]==undefined){
            return
        }
        let parent = keyNode[node.v._id == node.e._to ? node.e._from : node.e._to];

        if(parent.children==undefined){
            // vocabulary[parent.key].childrenFounders.forEach(ch=>{ch["level"]==parent.level})
            // parent.children = vocabularyObject.childrenFounders;
            parent.children=[];
        }

        if(vocabularyObject.children==undefined){
            vocabularyObject.children=[];
        }
        if(vocabularyObject.childrenKeys==undefined){
            vocabularyObject.childrenKeys=[];
        }

        if(parent.childrenKeys==undefined){
            parent.childrenKeys=[];
        }
        if(parent.parentName == vocabularyObject.name&&parent.parentName!=undefined){
            return
        }
        if(node.v!=null) {
            var child = {
                "id": unicId++,
                "key": node.v._id,
                "name":vocabularyObject.name||node.v.name,
                "type": node.v._id == node.e._from ? node.e.type : typeByType(node.e.type),
                "date":vocabularyObject.date_registration,
                "adress":vocabularyObject.legal_address,
                "region":getRegion(vocabularyObject.id_region),
                "company_size":getCompanySize(vocabularyObject.id_krp),
                "biin":node.v._id.split("/")[1],
                "active":vocabularyObject.active,
                "trustworthy":vocabularyObject.trustworthy,
                "parentName":parent.name,
                "foundernumber":vocabularyObject.childrenKeysFounders.length-1,
            }
        }
        if(child.type==models.types.company||child.type== models.types.company_founder||child.type==models.types.company_head||child.type==models.types.company_branch||child.type==models.types.entrepreneur){
            let directorFounded = false;
            vocabularyObject.childrenFounders.forEach(ch=>{

                if(ch.type==models.types.director){
                    directorFounded = true;
                    return
                }
            })
            if(!directorFounded){
                let directorChild = {
                    "id":unicId++,
                    "key":"director"+(unicId-1),
                    "name":vocabularyObject.fullname_director,
                    "type":models.types.director,
                }
                vocabularyObject.childrenFounders.unshift(directorChild);
            }
        }
        if(parent.childrenKeys.includes(child.name+child.type)){
            return
        }
        parent.childrenKeys.push(child.name+child.type);

        switch (child.type){
            case models.types.company_founder:
                child.level = parent.level;
                parent.children.splice(parent.children.map(ch=>ch.key+ch.type).indexOf(child.key+child.type),1);
                parent.children.push(child);
                break
            case models.types.founder:
                child.level = parent.level;
                parent.children.splice(parent.children.map(ch=>ch.key+ch.type).indexOf(child.key+child.type),1);
                parent.children.push(child);
                break
            case models.types.director:
                child.level = parent.level;
                parent.children.splice(parent.children.map(ch=>ch.key+ch.type).indexOf(child.key+child.type),1);
                parent.children.unshift(child);
                break
            case models.types.company:
                child.level = parent.level+1;
                parent.children.push(child);
                break
            default:
                child.level = parent.level+1;
                parent.children.push(child);
                break
        }
        if(child.type==models.types.company||child.type==models.types.company_founder){
            var arrClone = [];
            vocabularyObject.childrenFounders.forEach(ch=>{
                ch.level=child.level;
                ch.id=unicId++;
                if(ch.type!=models.types.director) {
                    arrClone.push({...ch})
                }
                else{
                    arrClone.unshift({...ch})
                }
            })
            child.children=arrClone;
        }
        if(!keyNode[node.v._id]){
            keyNode[node.v._id]=child;
        }
    })
    json = root;

    renderGraph();
}


function renderTreeGraph(data){

    //zoom + drag
    let startX = parseFloat(container.attr("transform").split("translate(")[1].split(",")[0]);
    let startY = parseFloat(container.attr("transform").split("translate(")[1].split(",")[1].split(")")[0]);
    let startScale = parseFloat(container.attr("transform").split("scale(")[1].split(")")[0]);
    function zoomMove(d){
        if(typeOfGraph==graphType.cards) {
            let x = startX + d3.event.translate[0];
            let y = startY + d3.event.translate[1];

            container.attr("transform", "translate(" + x + "," + y + ")" + " scale(" + (d3.event.scale-(1-startScale)) + ")")
        }
        else{
            // let x = parseInt(container.attr("x")) + d3.event.translate[0];
            // let y = parseInt(container.attr("y")) + d3.event.translate[1];
            let x =d3.event.translate[0];
            let y = d3.event.translate[1];
            container.attr("transform", "translate(" + x + "," + y + ")" + " scale(" + d3.event.scale + ")");
        }
    }
    var zoom = d3.behavior.zoom()
        .on("zoom",zoomMove)
        .scaleExtent([.1,4])
    function buttonZoomMove(zoomLevel){
        var zoomNum = 1;
        try{zoomNum = parseFloat( container.attr("transform").split("scale(")[1].split(")")[0])}
        catch {}
        zoom.scale(zoomNum+zoomLevel).event(container)
    }
    d3.select("#bigZoomButton").on("click",()=>buttonZoomMove((1.15-startScale)));
    d3.select("#lilZoomButton").on("click",()=>buttonZoomMove(.85-startScale));


    svg.call(zoom);




//line building
    function line2(d){
        let s = {x: d.source.x+d.source.width, y: d.source.y+d.source.height/2};
        let t = {x:d.target.x, y:d.target.y+d.target.height/2};

        function nLine(x,y){return "L"+x+","+y}
        if(d.source.level==d.target.level-1){
            var halfLine = s.x+46;
            d.source.index<40? halfLine = (d.source.level*(sizes.rectWidth+sizes.spaceBetweenRectX)-sizes.spaceBetweenRectX)+(sizes.spaceBetweenRectX-80)-d.source.index*(sizes.linkWidth+sizes.spaceBetweenLink):halfLine = s.x+d.source.index+20;


            return "M"+s.x+","+s.y+nLine(halfLine,s.y)+nLine(halfLine,t.y)+nLine(t.x,t.y);
        }
        else if(d.target.level>d.source.level){
            var halfLine = (d.source.level*(sizes.rectWidth+sizes.spaceBetweenRectX)-sizes.spaceBetweenRectX)+46;
            var indexesBetween = d.target.level-d.source.level;

            d.source.index<25? halfLine = (d.source.level*(sizes.rectWidth+sizes.spaceBetweenRectX)-sizes.spaceBetweenRectX)+250-d.source.index*(sizes.linkWidth+sizes.spaceBetweenLink):null;

            var height = -20-(d.source.index*4)-(d.source.level+4)

            return "M"+s.x+","+s.y+nLine(halfLine,s.y)+nLine(halfLine,height)+nLine((halfLine+(indexesBetween-1)*(sizes.rectWidth+sizes.spaceBetweenRectX)),height)+nLine((halfLine+(indexesBetween-1)*(sizes.rectWidth+sizes.spaceBetweenRectX)),t.y)+nLine(t.x,t.y);
        }
        else if(d.source.level==d.target.level){
            var firstPointX = (sizes.rectWidth-sizes.miniRectWidth)/2;
            return "M"+(s.x-sizes.rectWidth+firstPointX)+","+(s.y+sizes.rectHeight/2)+nLine((s.x-sizes.rectWidth+firstPointX),t.y)+nLine(t.x,t.y);
        }
    }

    function line(d){
        let s = {x: d.source.x+d.source.width, y: d.source.y+d.source.height/2};
        let t = {x:d.target.x, y:d.target.y+d.target.height/2};
        let halfX = (s.x+t.x)/2;
        let halfY = (s.y+t.y)/2;
        let fourth1 = (s.x+halfX)/2;

        function nLine(x,y){return "L"+x+","+y}

        if(d.source.level==d.target.level){
            var firstPointX = (sizes.rectWidth-sizes.miniRectWidth)/2;
            return "M"+(s.x-sizes.rectWidth+firstPointX)+","+(s.y+sizes.rectHeight/2)+nLine((s.x-sizes.rectWidth+firstPointX),t.y)+nLine(t.x,t.y);
        }
        else if(d.source.level==d.target.level-1){
            return "M"+s.x+" "+s.y+" Q "+fourth1+" "+s.y+" "+halfX+" "+halfY+" T "+t.x+" "+t.y;
        }
    }


//creating tree
    var tree = d3.layout.cluster()
        .size([sizes.windowHeight,sizes.windowWidth])




//creating extra card
    try{var extraCard = d3.select("div#extraCard")}
    catch (e) {
        console.log("#extracard not found")
    }


    try{
        var searchField = d3.select("input#search").on("input",()=>{
        highlightOn(null,"search");
        if(document.getElementById("search").value){clearSearchButton.classed("clearSearchBarInvisible",false).classed("clearSearchBar",true);}
        else {
            highLightOff();
            clearSearchButton.classed("clearSearchBar",false).classed("clearSearchBarInvisible",true);
            highlighredBusy = false;
        }
    });
    var clearSearchButton = d3.select("#clearSearch").on("click",()=>{
        highLightOff();
        clearSearchButton.classed("clearSearchBar",false).classed("clearSearchBarInvisible",true);
    })

    }
    catch (m){
        console.log(m)}


    var nodes = tree.nodes(data),
        links = tree.links(nodes);


//appending g.nodes
    var node = container.selectAll("g.node")
        .data(nodes)
        .enter()
        .append('g')
        .classed('node',true);



//giving nodes extra: level,index,color
    function nodesByLevels(nodes){
        var levels = [];
        var index = [];



        nodes.forEach(function (d) {
            //for card size
            switch (d.type){
                case models.types.root:
                    d.width = sizes.rectWidth;
                    d.height = sizes.rectHeight;
                    break
                case models.types.root_entrepreneur:
                    d.width = sizes.rectWidth;
                    d.height = sizes.rectHeight;
                    break
                case models.types.root_individual:
                    d.width = sizes.miniRectWidth;
                    d.height = sizes.miniRectHeight;
                    break
                case models.types.company:
                    d.width = sizes.rectWidth;
                    d.height = sizes.rectHeight;
                    break
                case models.types.company_founder:
                    d.width = sizes.rectWidth;
                    d.height = sizes.rectHeight;
                    break
                case models.types.founder:
                    d.width = sizes.miniRectWidth;
                    d.height = sizes.miniRectHeight;
                    break
                case models.types.director:
                    d.width = sizes.miniRectWidth;
                    d.height = sizes.miniRectHeight;
                    break
                case models.types.entrepreneur:
                    d.width = sizes.rectWidth;
                    d.height = sizes.rectHeight;
                    break
                case models.types.individual:
                    d.width = sizes.miniRectWidth;
                    d.height = sizes.miniRectHeight;
                    break
                case models.types.company_branch:
                    d.width = sizes.rectWidth;
                    d.height = sizes.rectHeight;
                    break
                case models.types.company_head:
                    d.width = sizes.rectWidth;
                    d.height = sizes.rectHeight;
                    break
                default:
                    d.width = sizes.miniRectWidth;
                    d.height = sizes.miniRectHeight;
                    d.color="black";
                    break
            }



            if (levels[d.level] == undefined ) {
                if(d.type == models.types.company||d.type==models.types.root||d.type==models.types.root_entrepreneur){
                    levels[d.level] = sizes.rectHeight;
                }
                else{
                    levels[d.level] = sizes.miniRectHeight;
                }
                index[d.level]=0;
                d.index=index[d.level];
                d.y=0;

            }
            else{
                if(d.parent==undefined||d.parent.level!=d.level){
                    d.y = levels[d.level]+sizes.spaceBetweenRectY;
                    levels[d.level]=d.y+d.height;
                }
                else{
                    d.y = levels[d.level]+sizes.miniSpaceBetweenRectY;
                    levels[d.level]=d.y+d.height;
                }
                d.index = ++index[d.level];

            }



            d.color = colors[d.type];
        });

    }



    //links by id
    var linkedById = {};
    links.forEach((d)=>{
        linkedById[d.source.id+","+d.target.id]=true;
    })
    //check is connect
    function isConnected(s,t){
        return linkedById[s.id+","+t.id]||s.id==t.id;
    }



    //giving index by order in level
    var levels = nodesByLevels(nodes);


    //svg in node


    //appending rect in node
    var rect = node.append("rect")
        .classed("treeGraph",true)
        .attr("height",d=>d.height)
        .attr("width",d=>d.width)
        .attr("fill",d=>{
            if(d.trustworthy===false){
                return colors.problem;
            }
            if(d.active===false){
                return colors.notActive;
            }
            return colors.normal;
        })
        .attr("y",d=>d.y)
        .attr("x",function(d){
            if(d.parent==undefined||d.parent.level!=d.level){
                d.x=(d.level-1)*(sizes.rectWidth+sizes.spaceBetweenRectX);

                return d.x;
            }
            if(d.parent==null){
                d.x=(d.level-1)*(sizes.rectWidth+sizes.spaceBetweenRectX);

                return d.x;
            }
            else if(d.level==d.parent.level){
                d.x=d.parent.x+(sizes.rectWidth-sizes.miniRectWidth);
                return d.x;
            }
            d.x = (d.level-1)*(sizes.rectWidth+sizes.spaceBetweenRectX)+(sizes.rectWidth-sizes.miniRectWidth);
            return d.x;
        })
        .style('rx', 5)
        .style("stroke-width", sizes.rectStrokeWidth)
        .style("stroke",d=>d.color)




    //build links
    var link = container.selectAll("path.link")
        .classed("treeGraph",true)
        .data(links,d=>d.target.id)
        .style("min-height",5);

    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("fill","none")
        .attr("stroke",d=> {
            if(d.target.type==models.types.founder||d.target.type==models.types.director||d.target.type==models.types.company_founder){
                return "gray";
            }
            return d.source.color;
        })
        .attr("stroke-width", sizes.linkWidth)
        .attr("d",d=>line(d))
        .on("mouseover",d=>highlightOn(d.source, "mouse"))
        .on("mouseout",()=>{
            if(!highlighredBusy){highLightOff()}
        });

    var linkText = link.append("text")
        .attr("font-family", "Arial, Helvetica, sans-serif")
        .attr("fill", "Black")
        .style("font", "normal 12px Arial")
        .attr("transform",d=>"translate("+d.source.x+","+d.source.y+")")
        .text(d=>d.target.type)
//main div for cards
    var rectContainer = node.append("foreignObject")
        .attr("class",d=>"rect"+d.type)
        .attr("width",d=>d.width)
        .attr("height",d=>d.height)
        .attr("x",d=>d.x)
        .attr("y",d=>d.y)
        .on("mousemove",(d)=>{
            showExtraCard(d);
            //setTimeout(highlightOn(d,"mouse"),2000)
            highlightOn(d,"mouse");
        })
        .on("mouseout",d=>{removeExtraCard(d);
        if(!highlighredBusy){highLightOff()}
        })

    //name
    var nameContainer = rectContainer.append("xhtml:div")
        .attr("class",d=>"nameContainer "+"nameContainer"+d.type)
        .style("padding-top","5px")
        .style("margin-left","10px")
        .style("margin-right","10px")
        .style("border-bottom","1px solid black")

    var nameLink = nameContainer.append("xhtml:a")
        .style("font-size","12px")
        .style("overflow","hidden")
        .style("max-height","30px")
        .style("color","black")
        .style("display"," -webkit-box")
        .style("-webkit-line-clamp","2")
        .style("-webkit-box-orient","vertical")
        .style("text-overflow","ellipsis")
        .classed("nameLink",true)
        .attr("href",d=>{
            if(d.biin!=undefined){
                if(d.type==models.types.director||d.typsse==models.types.founder||d.type==models.types.individual||d.type==models.types.root_individual){

                    return "/counterparty/individuals/detail/" + d.biin;
                }
                else if(d.type==models.types.root_entrepreneur||d.type==models.types.entrepreneur){
                    return "/counterparty/enterprise/detail/" + d.biin
                }
                return "/counterparty/detail/" + d.biin;
            }
        })
        .text(d=>returnText(d.name));

    //info block
    var infoContainer = rectContainer.append("xhtml:div")
        .attr("class",d=>"infoContainer "+"infoContainer"+d.type)
        .style("max-height","80px")
        .style("margin-left","10px")
        .style("margin-right","10px")

    var infoTextCompanies = d3.selectAll("div.infoContainer"+models.types.company+",div.infoContainer"+models.types.company_founder+",div.infoContainer"+models.types.root+",div.infoContainer"+models.types.root_entrepreneur+",div.infoContainer"+models.types.entrepreneur+",div.infoContainer"+models.types.company_head+",div.infoContainer"+models.types.company_branch)
        .style()

    infoTextCompanies.append("h4")
        .style("margin",0)
        .style("font-size","12px")
        .style({
            "display": "-webkit-box",
            "-webkit-line-clamp":"1",
            "-webkit-box-orient": "vertical",
        })
        .attr("class","infoName")
        .style("overflow","hidden")
        .style("text-overflow","ellipsis")
        .text("Дата регистрации: ")
        .append("span")
        .attr("class","infoText")
        .text(d=>returnText(d.date));

    infoTextCompanies.append("h4")
        .style("margin",0)
        .style("font-size","12px")
        .style({
            "display": "-webkit-box",
            "-webkit-line-clamp":"1",
            "-webkit-box-orient": "vertical",
        })
        .style("overflow","hidden")
        .style("text-overflow","ellipsis")
        .attr("class","infoName")
        .text("Регион: ")
        .append("span")
        .attr("class","infoText")
        .text(d=>returnText(d.region));

    infoTextCompanies.append("h4")
        .style("margin",0)
        .style("font-size","12px")
        .style({
            "display": "-webkit-box",
            "-webkit-line-clamp":"3",
            "-webkit-box-orient": "vertical",
        })
        .style("overflow","hidden")
        .style("text-overflow","ellipsis")
        .attr("class","infoName")
        .text("Адрес: ")
        .append("span")
        .attr("class","infoText")
        .text(d=>returnText(d.adress));

    var infoTextInd = d3.selectAll("div.infoContainer"+models.types.director+", div.infoContainer"+models.types.founder+", div.infoContainer"+models.types.individual+", div.infoContainer"+models.types.root_individual)
        .append("h4")
        .attr("class","infoName")
        .style("margin",0)
        .style("font-size","12px")
        .text(d=>getRussType(d.type))

    var founderNumber = d3.selectAll("foreignObject.rect"+models.types.company+", foreignObject.rect"+models.types.root+", foreignObject.rect"+models.types.company_head)
        .append("xhtml:h4")
        .style("font-size","12px")
        .attr("class","founderNumber")
        .style("position","absolute")
        .style("left","10px")
        .style("bottom","10px")
        .text("Учредителей:")
        .append("span")
        .attr("class","founderNumber treeGraph")
        .text(d=>returnText(d.foundernumber));






    var highlighted = false;
    var highlighredBusy = false;
    function highlightOn(d,strEvent){
        if(strEvent=="mouse"&&!highlighredBusy) {
            rect
                .style("stroke-width", t => {
                if (isConnected(d, t)) {
                    return sizes.rectStrokeWidthHighlighted;
                }
                return sizes.rectStrokeWidth;
            })
                .style("opacity",t=>isConnected(d,t)?1:lowOpacity);

            link.style("stroke-width", t => {

                if (t.source.id == d.id) {
                    //link.style("opacity",1)
                    return sizes.linkWidthHighlighted;

                }})
        }
        else if(strEvent=="search"){
            highlighredBusy = true;
            var text = document.getElementById("search").value.toLowerCase();
            rect.style("stroke-width",function(d){
                if(text!='') {
                    if (d.name.toLowerCase().includes(text)) {

                        return sizes.rectStrokeWidthHighlighted;
                    }
                    else if(d.parent){
                        if(d.parent.name.toLowerCase().includes(text)){
                            return sizes.rectStrokeWidthHighlighted;
                        }
                    }
                    return sizes.rectStrokeWidth;
                }
            })
                .style("opacity",function(d){
                    if(text!="") {
                        if ( d.name.toLowerCase().includes(text)) {

                            return 1;
                        }
                        else if(d.parent){
                            if(d.parent.name.toLowerCase().includes(text)){
                                return 1;
                            }
                        }
                        return lowOpacity;
                    }
                })


            rectContainer.style("opacity",d=>{
                if(d.parent){
                    if(d.parent.name.toLowerCase().includes(text)){
                        return 1;
                    }
                    else if(d.name.toLowerCase().includes(text)){
                        return 1;
                    }
                }
                else if(d.name.toLowerCase().includes(text)){
                    return 1;
                }
                return lowOpacity;
            });

            link
                .style("opacity",l=>text!=""&&l.source.name.toLowerCase().includes(text)?1:0)
                .style("stroke-width",l=>text!=""&&l.source.name.toLowerCase().includes(text)?sizes.linkWidthHighlighted:0)


        }
        highlighted = true;
    }
    function highLightOff(){
        document.getElementById("search").value = "" ;
        rectContainer.style("opacity",1)
        if(highlighted) {
            highlighredBusy=false;
            rect.style("stroke-width", sizes.rectStrokeWidth).style("opacity",1)
            link.style("stroke-width", sizes.linkWidth).style("opacity",1)
        }
    }




}


function renderCircleGraph(data){
    //zoom + drag
    function zoomMove(d){
        if(typeOfGraph==graphType.cards) {
            // let x = parseInt(container.attr("x")) + d3.event.translate[0];
            // let y = parseInt(container.attr("y")) + d3.event.translate[1];
            let x = 100 + d3.event.translate[0];
            let y = 100 + d3.event.translate[1];

            container.attr("transform", "translate(" + x + "," + y + ")" + " scale(" + (d3.event.scale-(1-startScale)) + ")")
        }
        else{
            // let x = parseInt(container.attr("x")) + d3.event.translate[0];
            // let y = parseInt(container.attr("y")) + d3.event.translate[1];
            let x = 100+d3.event.translate[0];
            let y = 100+d3.event.translate[1];
            container.attr("transform", "translate(" + x + "," + y + ")" + " scale(" + (d3.event.scale-(1-startScale)) + ")");
        }
    }
    var zoom = d3.behavior.zoom()
        .on("zoom",zoomMove)
        .scaleExtent([.4,4])
    function buttonZoomMove(zoomLevel){
        var zoomNum = 1;
        try{zoomNum = parseFloat( container.attr("transform").split("scale(")[1].split(")")[0])}
        catch {}
        zoom.scale(zoomNum+zoomLevel).event(container)
    }
    d3.select("#bigZoomButton").on("click",()=>buttonZoomMove((1.15-startScale)));
    d3.select("#lilZoomButton").on("click",()=>buttonZoomMove(.85-startScale));
    svg.call(zoom);

    function line(d){
        var s = {x: d.source.x, y: d.source.y};
        var t = {x:d.target.x, y:d.target.y};
        return "M"+s.x+","+s.y+"L"+t.x+","+t.y;
    }
    function isRoot(str){
        if(str==models.types.root||str==models.types.root_entrepreneur||str==models.types.root_individual){
            return true;
        }
        return false;
    }
    function circleSize(type){
        if(type==models.types.founder||type==models.types.director||type==models.types.company_branch){
            return 35;
        }
        else if(isRoot(type)){
            return 100;
        }
        else{
            return 50;
        }
    }
    function isConnected(d,t){
        return linkedByIndex[d.id+","+t.id]||linkedByIndex[t.id+","+d.id]||d.id==t.id;
    }
    function getAvatarByType(type){
        if(type==models.types.founder||type==models.types.root_individual||type==models.types.individual){

            return images.humanFounder;
        }
        else if(type==models.types.root_entrepreneur||type==models.types.entrepreneur){
            return images.entrepreneur;
        }
        else if(type==models.types.company_branch){
            return images.companyBranch;
        }
        else if(type==models.types.director){
            return images.director;
        }
        return images.organisation;
    }

    var force = d3.layout.force()
        .linkDistance(d=>{
            if(d.source.children.length<4){
                return 350;
            }
            else{
                return 400;
            }
        })
        .charge(d=>{

            if(isRoot(d.type)){
                return -45000
            }
            return -30000
        })
        .size([sizes.windowWidth,sizes.windowHeight])
        .linkStrength(11)

    var tree = d3.layout.cluster()
        .size([sizes.windowWidth,sizes.windowHeight])

    var nodesData = tree.nodes(data),
        linksData = tree.links(nodesData);

    nodesData = nodesData.filter(n=>{
        try {
            if (n.name != n.parent.parent.name) {
                return n;
            }
        }
        catch (e) {
            return n
        }
    });
    linksData = linksData.filter(n=>{
        try {
            if (n.target.name != n.target.parent.parent.name) {
                return n;
            }
        }
        catch (e) {
            return n
        }
    });



    var linkedByIndex={};
    linksData.forEach(link=>{
        linkedByIndex[link.source.id+","+link.target.id]=true;
    })



    force
        .nodes(nodesData)
        .links(linksData)
        .start();




    var link = container.selectAll(".link")
        .data(linksData)
        .enter()
        .append("path")
        .attr("stroke",d=>colors[d.source.type])
        .attr("stroke-width",1)
        .attr("opacity",.7)
        .attr("fill","none")
        .attr("d",d=>line(d))

    var node = container.selectAll(".node")
        .data(nodesData)
        .enter()
        .append("g")
        .attr("class",d=>{
            d.size = circleSize(d.type)
            return "node"
        })
        .attr("id",d=>{
            if(d.type==models.types.root_entrepreneur||d.type==models.types.root_individual||d.type==models.types.root){
                return "root";
            }
        })
        .attr("transform",d=>"translate("+d.x+","+d.y+")")
        .call(force.drag)



    // var textCard = node.append("text")
    //     .text(d=>d.name)
    //     .attr("x",d=>-d.size)
    //     .attr("y",d=>d.size+20)
    //     .style("z-index",3)

    var textCard = node.append("foreignObject")
        .attr("x",d=>-d.size*1.75)
        .attr("y",d=>d.size)
        .attr("width",d=>d.size*3.5)
        .attr("height",d=>d.size*1.6)

    var nameText = textCard.append("xhtml:h2")
        .text(d=>d.name)
        .attr("class","circleTextName")
        .style("margin","5px")
        .style("font-size",d=>{
            if(isRoot(d.type)){
                return d.size*.25+"px";
            }
            else if(d.type==models.types.founder||d.type==models.types.director||d.type==models.types.individual){
                return d.size*.4+"px";
            }
            return d.size*.37+"px";
        })
        .style("text-align","center")
        .style("max-height",d=>d.size*.8)
        .style("overflow","hidden")
        .on("click",d=>{
            if(d.biin!=undefined){
                if(d.type==models.types.director||d.type==models.types.founder||d.type==models.types.individual||d.type==models.types.root_individual){

                    window.location.href = "/counterparty/individuals/detail/" + d.biin;
                }
                window.location.href = "/counterparty/detail/" + d.biin;
            }
        })

    var typeText = textCard.append("xhtml:h3")
        .text(d=>getRussType(d.type))
        .style("margin",0)
        .style("font-size",d=>{
            if(isRoot(d.type)){
                return d.size*.2+"px";
            }
            else if(d.type==models.types.founder||d.type==models.types.director||d.type==models.types.individual){
                return d.size*.3+"px";
            }
            return d.size*.25+"px";
        })
        .style("text-align","center");

    var bigCircle = node.append("circle")
        .attr("r",d=>{
            return d.size
        })
        .style("stroke-width",2)
        .style("stroke","#587AB0")
        .style("cursor","pointer")
        .attr("fill",d=>{
            if(d.trustworthy===true){
                return colors.problem;
            }
            if(d.active===false){
                //return "MistyRose"
                return colors.notActive;
            }
            //return "azure"
            return colors.normal;
        })
        .on("mousemove",(d)=>{
            highlightOn(d,"mouse");
            showExtraCard(d)
        })
        .on("mouseout",()=>{
            if (!highlighredBusy) {
                highLightOff();
            }
            removeExtraCard();
        })

    var circle = node.append("image")
        .attr("xlink:href",d=>getAvatarByType(d.type))
        .attr("r",d=>{
            return d.size
        })
        .attr("x",d=>-d.size/2)
        .attr("y",d=>-d.size/2)
        .attr("height",d=>d.size)
        .style("stroke-width",2)
        .style("cursor","pointer")
        .on("mousemove",(d)=>{
            highlightOn(d,"mouse");
            showExtraCard(d)
        })
        .on("mouseout",()=>{
            if (!highlighredBusy) {
                highLightOff();
            }
            removeExtraCard();
        })

    force
        .on("tick",()=> {
            node.attr("transform", d=>"translate(" + d.x + "," + d.y + ")");
            link.attr("d",d=>line(d))
        })




    try{
        var searchField = d3.select("input#search").on("input",()=>{
            highlightOn(null,"search");
            if(document.getElementById("search").value){clearSearchButton.classed("clearSearchBarInvisible",false).classed("clearSearchBar",true);}
            else {
                highLightOff();
                clearSearchButton.classed("clearSearchBar",false).classed("clearSearchBarInvisible",true);
                highlighredBusy = false;
            }
        });
        var clearSearchButton = d3.select("#clearSearch").on("click",()=>{
            highLightOff();
            clearSearchButton.classed("clearSearchBar",false).classed("clearSearchBarInvisible",true);
            highlighredBusy = false;
        })

    }
    catch (m){
        console.log(m)}

    var highlighted = false;
    var highlighredBusy = false;
    function highlightOn(d,strEvent){
        if(strEvent=="mouse"&&!highlighredBusy) {
            bigCircle.style("stroke-width", t => {
                if (isConnected(d, t)) {
                    return sizes.rectStrokeWidthHighlighted;
                }
                return sizes.rectStrokeWidth;
            })
                .style("opacity",t => {
                    if (isConnected(d, t)) {
                        return 1;
                    }
                    return lowOpacity;
                })

            link.style("stroke-width", t => {

                if (d.id==t.source.id||d.id==t.target.id) {
                    //link.style("opacity",1)
                    return sizes.linkWidthHighlighted;

                }})
        }
        else if(strEvent=="search"){
            highlighredBusy = true;
            var text = document.getElementById("search").value.toLowerCase();
            bigCircle.style("stroke-width",function(d){
                if(text!='') {
                    if (d.name.toLowerCase().includes(text)) {

                        return sizes.rectStrokeWidthHighlighted;
                    }
                    if(d.parent!=undefined){
                        if(d.parent.name.toLowerCase().includes(text)){
                            return sizes.rectStrokeWidthHighlighted;
                        }
                    }
                    if(d.children) {
                        if (d.children.some(item =>item.name.toLowerCase().includes(text))){
                            return sizes.rectStrokeWidthHighlighted;
                        }
                    }
                    // if(d.children){
                    //     if(d.children.some(o=>o.name.includes(text))){
                    //         return sizes.rectStrokeWidthHighlighted;
                    //     }
                    // }
                    return sizes.rectStrokeWidth;
                }
            })
                .style("opacity",d => {
                    if (d.name.toLowerCase().includes(text)) {
                        return 1;
                    }
                    if(d.parent) {
                        if (d.parent.name.toLowerCase().includes(text)) {
                            return 1;
                        }
                    }
                    if(d.children) {
                        if (d.children.some(item =>item.name.toLowerCase().includes(text))){
                            return 1;
                        }
                    }
                    return lowOpacity;
                })


            textCard.style("opacity",d=>{
                if(d.parent){
                    if(d.parent.name.toLowerCase().includes(text)){
                        return 1;
                    }
                    if(d.name.toLowerCase().includes(text)){
                        return 1;
                    }
                }
                if(d.children) {
                    if (d.children.some(item =>item.name.toLowerCase().includes(text))){
                        return 1;
                    }
                }
                return lowOpacity;
            });

            link
                .style("opacity",l=>{
                    if(l.source.name.toLowerCase().includes(text)){
                        return 1;
                    }
                    if(l.target.name.toLowerCase().includes(text)){
                        return 1;
                    }

                    return 0;
                })

                .style("stroke-width",l=>{
                    if(l.source.name.toLowerCase().includes(text)){
                        return sizes.rectStrokeWidthHighlighted;
                    }
                    if(l.target.name.toLowerCase().includes(text)){
                        return sizes.rectStrokeWidthHighlighted;
                    }
                    return 0;
                })


        }
        highlighted = true;
    }
    function highLightOff(){
        document.getElementById("search").value = "";
        textCard.style("opacity",1)
        if(highlighted) {
            bigCircle.style("stroke-width", sizes.rectStrokeWidth).style("opacity",1);
            link.style("stroke-width", sizes.linkWidth).style("opacity",1);
        }
    }


}


function getJSON(url, callback) {
    //url="/connection_loader_test?biin=100940005678&company_type=companies";


    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = async function() {
        var status = await xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
            DATA = await xhr.response;
            console.log("data",DATA)
            if(DATA.success) {
                vocabulary = Object.assign(vocabulary,DATA.data.data_counterparty);
                bigData = bigData.concat(DATA.data.responseResult.result);
                dataFormatter2(bigData);
                loaderDisactivator();
            }
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
//START FUNCT
function startConnections(){

    loaderActivator();
    var biin = document.getElementById('biin').innerText;
    var caption = document.getElementById('caption').innerText;

    getJSON('/connection_loader_test?biin='+parseInt(biin)+'&company_type='+(caption=="company"?"companies":"individuals"),
        function(err, json) { if (err !== null) { alert('Something went wrong: ' + err);}
        else {
            if (Object.keys(json).length <= 1) {
                console.log("no data");
            }
        }
        });
}

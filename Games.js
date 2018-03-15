var texto = "";
function OnStart()
{
	//Create a layout with objects vertically centered.
    var lay = app.CreateLayout("linear", "VCebter,FillXY");
    lay.SetBackGradientRadial(0.7, 0.2, 0.5, "#24516B", "#000000");
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
	
	//Create a button
	//btn = app.CreateButton("Comenzar", 0.4, 0.1, "Custom" );
	//btn.SetMargins( 0, 0.75, 0, 0 );
	//btn.SetStyle( "#1776b2", "#1776b2", 9.5 );//#Color bordes, #Color fondo, Cantos del botón
    //btn.SetTextShadow( 10, 0, 1, "#1776b2" );
	//lay.AddChild( btn );

	//Set function to call when button pressed.
	// btn.SetOnTouch( btn_OnTouch );
	
	//Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" );
    
	//Create the main app layout with objects vertically centered.
	layMain = app.CreateLayout( "Linear", "VCenter,FillXY" );
	layMain.SetBackground( "/Sys/Img/Sky.jpg" );

	//Create a text label and add it to main layout.
    txt = app.CreateText( "Elige un juego en el \ndesplegable de la izquierda", 0.8, 0.2, "Multiline" );
    txt.SetTextSize( 24, "dip" );
    txt.SetTextColor( "#1776b2" );
	layMain.AddChild( txt );
	
	//Create a drawer containing a menu list.
	CreateDrawer();
	
	//Add main layout and drawer to app.	
	app.AddLayout( layMain );
	app.AddDrawer( drawerScroll, "Left", drawerWidth );
	
	//Add layout to app.
	app.AddLayout( lay );
}
//Called when user touches our button.
function btn_OnTouch()
{
	var num_participantes=0;
	//Show a popup message.
	//app.ShowPopup( "Your time is over" );
    
    num_participantes = prompt("Número de participantes: ");
        
    if (num_participantes>=2)
        ShowRandom( num_participantes );
    else{
        if (num_participantes<2 && num_participantes != "" && num_participantes != null)
            alert("Este juego no tiene sentido");
        else
            alert("Introduzca un número válido.");
        }
	
	//Vibrate phone with a pattern (in milliseconds).
	//pause,vibrate,pause,vibrate...
	//app.Vibrate( "30,100,50,150" );
}


function ShowRandom( range )
{
    var num = Math.random() * (range-1);
    num = Math.round(num)+1;
    alert( num );
}
    


//Create the drawer contents.
function CreateDrawer()
{
    //Create a layout for the drawer.
	//(Here we also put it inside a scroller to allow for long menus)
	drawerWidth = 0.65;
    drawerScroll = app.CreateScroller( drawerWidth, 1 );
    drawerScroll.SetBackColor( "White" );
	layDrawer = app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer );
	
	//Create layout for top of drawer.
	layDrawerTop = app.CreateLayout( "Absolute" );
	layDrawerTop.SetBackground( "/Sys/Img/BlueBack.png" );
	layDrawerTop.SetSize( drawerWidth, 0.23 );
	layDrawer.AddChild( layDrawerTop );
	
	//Add an icon to top layout.
	//var img = app.CreateImage( "/Sys/Img/Icon.png", 0.15 );
	//img.SetPosition( drawerWidth*0.06, 0.04 );
	//layDrawerTop.AddChild( img );
	
	//Add user name to top layout.
	var txtUser = app.CreateText( "Sandra B." ,-1,-1,"Bold");
	txtUser.SetPosition( drawerWidth*0.07, 0.155 );
	txtUser.SetTextColor( "White" );
	txtUser.SetTextSize( 13.7, "dip" );
	layDrawerTop.AddChild( txtUser );
	
	//Add user email to top layout.
	txtNick = app.CreateText( "xula_la_isla" );
	txtNick.SetPosition( drawerWidth*0.07, 0.185 );
	txtNick.SetTextColor( "#bbbbbbfff" );
	txtNick.SetTextSize( 14, "dip" );
	layDrawerTop.AddChild( txtNick );
	
	//Create menu layout.
	var layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );
	
    //Add a list to menu layout (with the menu style option).
    var listItems = "Inicio::[fa-home],Cifras y letras::[fa-users],Pictionary::[fa-tag]";
    lstMenu1 = app.CreateList( listItems, drawerWidth, -1, "Menu,Expand" );
    lstMenu1.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenu1.SelectItemByIndex( 0, true );
    //lstMenu1.SetItemByIndex( 0, "Primary", 21 );
    lstMenu1.SetOnTouch( lstMenu_OnTouch );
    
    //if(lstMenu1 == "Pictionary")
        //alert("Hola");
    //alert(lstMenu1);
    layMenu.AddChild( lstMenu1 );
    
    //Add seperator to menu layout.
    var sep = app.CreateImage( null, drawerWidth,0.001,"fix", 2,2 );
    sep.SetSize( -1, 1, "px" );
    sep.SetColor( "#cccccc" );
    layMenu.AddChild( sep );
    
    //Add title between menus.
	txtTitle = app.CreateText( "Opciones",-1,-1,"Left");
	txtTitle.SetTextColor( "#222222" );
	txtTitle.SetMargins( 16,12,0,0, "dip" );
	txtTitle.SetTextSize( 14, "dip" );
	//layMenu.AddChild( txtTitle );
	
    //Add a second list to menu layout.
    var listItems = "Starred::[fa-star],Important::[fa-flag],Ajustes::[fa-cog]";
    lstMenu2 = app.CreateList( listItems, drawerWidth, -1, "Menu,Expand" );
    lstMenu2.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenu2.SetOnTouch( lstMenu_OnTouch );
    //layMenu.AddChild( lstMenu2 );
}

//Handle menu item selection.
function lstMenu_OnTouch( title, body, type, index )
{
    //Close the drawer.
    app.CloseDrawer( "Left" );
    
    //Highlight the chosen menu item in the appropriate list.
    if( this==lstMenu1 ) lstMenu2.SelectItemByIndex(-1);
    else lstMenu1.SelectItemByIndex(-1);
    this.SelectItemByIndex( index, true );
    
    if(title == "Inicio")
        OnStart();
    if(title == "Pictionary")
        Pictionary();
        
    if(title == "Cifras y letras")
        CifrasYLetras();
}

//Called when a drawer is opened or closed.
function OnDrawer( side, state )
{
    console.log( side + " : " + state );
}

//Called when hardware menu key pressed.
function OnMenu( name )
{  
   app.OpenDrawer();
}


function CifrasYLetras(){    
    //Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" );
    
	//Create the main app layout with objects vertically centered.
	layMain = app.CreateLayout( "Linear", "VCenter,FillXY" );
	layMain.SetBackground( "/Sys/Img/GreenBack.png" );
	
    var lay = app.CreateLayout("linear", "VCenter,FillXY");
    lay.SetBackGradientRadial(0.7, 0.2, 0.5, "#24516B", "#000000");

	//CreateDrawer();
	
	//Add main layout and drawer to app.	
	//app.AddLayout( layMain );
	//app.AddDrawer( drawerScroll, "Left", drawerWidth );
	
	//Add layout to app.
	//app.AddLayout( lay );
	
    //lista 
    lst = app.CreateList(null, 1, 0.7, "Left,Top");
    lst.SetMargins(0, 0);
    lst.RemoveAll();
    lst.SetMargins(0, 0.05, 0, 0);
    //lst.SetOnLongTouch(lst_pulsacionLarga);
    lst.SetTextSize1(15);
    lst.SetTextSize2(14);
    lay.AddChild(lst);
    
    layBut = app.CreateLayout("Linear", "Horizontal");
    lay.AddChild(layBut);
    
    app.AddLayout( layMain );
	app.AddDrawer( drawerScroll, "Left", drawerWidth );
	
	lay = app.CreateLayout( "Linear", "Horizontal,FillXY" );


  layLight =  app.CreateLayout( "Linear", "Vertical,FillXY" );
  layLight.SetPadding( 0.05, 0.05, 0.05, 0.05 );
  //layLight.SetPadding( 0.05, 0.05, 0.05, 0.05 );
  lay.AddChild( layLight );
  
  //style params: color1,color2,radius,strokeClr,strokeWidth,shadow
  b = app.CreateButton( "Cifras", 0.9, 0.45, "Custom" );
  b.SetStyle( "#4192f4", "#4192f4", 10 );
  //b.SetMargins(0,0.5,0,0);
  //b.SetTextShadow( 5, 3, -1, "#fca52a" );
  b.SetOnTouch(cifras);
  layLight.AddChild( b );
  
  //layLight2 =  app.CreateLayout( "Linear", "Vertical" );
  //layLight2.SetPadding( 0, 0.05, 0.05, 0.09 );
  //lay.AddChild( layLight2 );
  
  b2 = app.CreateButton( "Letras", 0.9, 0.45, "Custom" );
  b2.SetStyle( "#cc351a", "#cc351a", 10 );
  b2.SetOnTouch(letras);
  //b2.SetMargins(0.5,0.5,0,0);
  //b2.SetTextShadow( 5, 3, -1, "#4285F4" );
  layLight.AddChild( b2 );

    	
  app.AddLayout( lay );
  
	
	
    
	
	//Add main layout and drawer to app.	
	app.AddLayout( layMain );
	app.AddDrawer( drawerScroll, "Left", drawerWidth );
}

function letras(){ 
  	layMain = app.CreateLayout( "Linear", "VCenter,FillXY" );
	layMain.SetBackground( "/Sys/Img/GreenBack.png" );
	layMain.AddChild
	app.AddLayout( layMain );
  lay = app.CreateLayout( "Linear", "Horizontal,FillXY" );

  layLight =  app.CreateLayout( "Linear", "Horizontal" );
  layLight.SetPadding( 0.15, 0.8, 0.1, 0.1 );
  lay.AddChild( layLight );
  
  //style params: color1,color2,radius,strokeClr,strokeWidth,shadow
  b = app.CreateButton( "Vocal", 0.35, 0.12, "Custom" );
  b.SetStyle( "#fca52a", "#fca52a", 10 );
  //b.SetMargins(0,0.5,0,0);
  //b.SetTextShadow( 5, 3, -1, "#fca52a" );
  b.SetOnTouch(btn_Vocal);
  layLight.AddChild( b );
  
  layLight2 =  app.CreateLayout( "Linear", "Horizontal" );
  layLight2.SetPadding( 0.4, 0.1, 0.5, 0.1 );
  lay.AddChild( layLight2 );
  
  b2 = app.CreateButton( "Consonante", 0.35, 0.12, "Custom" );
  b2.SetStyle( "#4285F4", "#4285F4", 10 );
  b2.SetOnTouch(btn_Consonante);
  //b2.SetMargins(0.5,0.5,0,0);
  //b2.SetTextShadow( 5, 3, -1, "#4285F4" );
  layLight.AddChild( b2 );

    	
  app.AddLayout( lay );
}

function btn_Vocal(){
    var posibles_vocales =['A', 'E', 'I', 'O', 'A', 'U', 'E', 'I', 'O'];
    //var texto;
    var aleatorio;
    var tiempo = 10;
    
    if(texto.length >= 36)
        texto ="";
    lst.RemoveAll();
    
    aleatorio = Math.floor(Math.random() * 8);
    
    //app.ShowPopup(posibles_vocales[aleatorio]);
    //app.CreateList("1", "2");
    //app.CreateTextEdit("1", "2")
    //texto = aleatorio;
    //textoLayout = app.CreateText(texto);
    var lay = app.CreateLayout("linear", "VCenter");
    if (texto == "")
        lst = app.CreateList(texto, 1, 0.7, "Left,Top");

    lst.SetMargins(0, 0);
    //lst.RemoveAll();
    lst.SetMargins(0, 0.05, 0, 0);
    //lst.SetOnLongTouch(lst_pulsacionLarga);
    lst.SetTextSize1(15);
    lst.SetTextSize2(28);
    
    texto = texto + "   " + posibles_vocales[aleatorio];
    
    if(texto.length >= 36){
        //app.ShowProgressBar( "Processing...", 0 , "max =45");
 
        setTimeout( "Update(45)", 100 );
        setTimeout( "Update(40)", 5000 );
        setTimeout( "Update(35)", 10000 );
        setTimeout( "Update(30)", 15000 );
        setTimeout( "Update(25)", 20000 );
        setTimeout( "Update(20)", 25000 );
        setTimeout( "Update(15)", 30000 );
        setTimeout( "Update(10)", 35000 );
        setTimeout( "Update(5)", 40000 );
        setTimeout( "Update(0)", 45000 );
    	
    	app.Vibrate( "46000,1000" );
	
    	setTimeout( "CifrasYLetras()", 46000 );
    	
    }
    
    lst.AddItem("Letras", texto);
    //lst = app.SaveText(lst, lst);
    
    lay.AddChild(lst);
    app.AddLayout(lay);

    //layButDlg = app.CreateLayout("Linear", "Horizontal");
    //lay.AddChild(layButDlg);
    //lay.AddLayout( lst );
    //app.HideProgress();
}

function btn_Consonante(){
    var posibles_consonantes = ['B','C','D','D','F','G','H','J','L','M','N','N','P','Q','R','R','S','S','T','T','V','Y','Z'];
    var aleatorio;
    if(texto.length >= 36)
        texto ="";
    lst.RemoveAll();
    
    aleatorio = Math.floor(Math.random() * 23);
    
    //app.ShowPopup(posibles_vocales[aleatorio]);
    //app.CreateList("1", "2");
    //app.CreateTextEdit("1", "2")
    //texto = aleatorio;
    //textoLayout = app.CreateText(texto);
    var lay = app.CreateLayout("linear", "VCenter");
    if (texto == "")
        lst = app.CreateList(texto, 1, 0.7, "Left,Top");

    lst.SetMargins(0, 0);
    //lst.RemoveAll();
    lst.SetMargins(0, 0.05, 0, 0);
    //lst.SetOnLongTouch(lst_pulsacionLarga);
    lst.SetTextSize1(15);
    lst.SetTextSize2(28);
     
    texto = texto + "   " + posibles_consonantes[aleatorio];
    
    if(texto.length >= 36){
        //app.ShowProgressBar( "Processing...", 0 , "max =45");
 
        setTimeout( "Update(45)", 100 );
        setTimeout( "Update(40)", 5000 );
        setTimeout( "Update(35)", 10000 );
        setTimeout( "Update(30)", 15000 );
        setTimeout( "Update(25)", 20000 );
        setTimeout( "Update(20)", 25000 );
        setTimeout( "Update(15)", 30000 );
        setTimeout( "Update(10)", 35000 );
        setTimeout( "Update(5)", 40000 );
        setTimeout( "Update(0)", 45000 );
    	
    	app.Vibrate( "46000,1000" );
	
    	setTimeout( "CifrasYLetras()", 46000 );
    	
    }
    
    lst.AddItem("Letras", texto);
    //lst = app.SaveText(lst, lst);

    
    lay.AddChild(lst);
    app.AddLayout(lay);

    //layButDlg = app.CreateLayout("Linear", "Horizontal");
    //lay.AddChild(layButDlg);
    //lay.AddLayout( lst );
    //app.HideProgress();
}

function cifras(){
  	layMain = app.CreateLayout( "Linear", "VCenter,FillXY" );
	layMain.SetBackground( "/Sys/Img/GreenBack.png" );
	layMain.AddChild
	app.AddLayout( layMain );
	
    lay = app.CreateLayout( "Linear", "Horizontal,FillXY" );

    layLight =  app.CreateLayout( "Linear", "Horizontal" );
    layLight.SetPadding( 0.15, 0.8, 0.1, 0.1 );
    lay.AddChild( layLight );
    app.AddLayout( lay );
    
    //style params: color1,color2,radius,strokeClr,strokeWidth,shadow
    b = app.CreateButton( "Nueva partida", 0.45, 0.12, "Custom" );
    b.SetStyle( "#fca52a", "#fca52a", 10 );
   //b.SetMargins(0,0.5,0,0);
    //b.SetTextShadow( 5, 3, -1, "#fca52a" );
    b.SetOnTouch(cifras);
    layLight.AddChild( b );

    var posibles_cifras = ['1','2','3','4','5','6','7','8','9','10','25','50','75','100','250','500'];
    var aleatorio;
    if(texto.length >= 24)
        texto ="";
    lst.RemoveAll();
    
    
    var lay = app.CreateLayout("linear", "VCenter");
    if (texto == "")
        lst = app.CreateList(texto, 1, 0.7, "Left,Top");

    lst.SetMargins(0, 0);
    lst.SetMargins(0, 0.05, 0, 0);
    lst.SetTextSize1(15);
    lst.SetTextSize2(28);
    
    for(i=0;i<6;i++){
        aleatorio = Math.floor(Math.random() * posibles_cifras.length);
        texto = texto + "    " + posibles_cifras[aleatorio];
    }

    lst.AddItem("Cifras", texto);
    lay.AddChild(lst);
    app.AddLayout(lay);
    
    app.Alert(Math.floor(Math.random() * 900 + 100));
    
    if(texto.length >= 24){
        //app.ShowProgressBar( "Processing...", 0 , "max =45");
 
        setTimeout( "Update(45)", 100 );
        setTimeout( "Update(40)", 5000 );
        setTimeout( "Update(35)", 10000 );
        setTimeout( "Update(30)", 15000 );
        setTimeout( "Update(25)", 20000 );
        setTimeout( "Update(20)", 25000 );
        setTimeout( "Update(15)", 30000 );
        setTimeout( "Update(10)", 35000 );
        setTimeout( "Update(5)", 40000 );
        setTimeout( "Update(0)", 45000 );
    	
    	app.Vibrate( "46000,1000" );
	
    	setTimeout( "CifrasYLetras()", 46000 );
    }
}

function Pictionary(){
    	//Create a layout with objects vertically centered.
    var lay = app.CreateLayout("linear", "VCebter,FillXY");
    lay.SetBackGradientRadial(0.7, 0.2, 0.5, "#24516B", "#000000");
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	
	
	//Create a button
	//btn = app.CreateButton("Comenzar", 0.4, 0.1, "Custom" );
	//btn.SetMargins( 0, 0.75, 0, 0 );
	//btn.SetStyle( "#1776b2", "#1776b2", 9.5 );//#Color bordes, #Color fondo, Cantos del botón
    //btn.SetTextShadow( 10, 0, 1, "#1776b2" );
	//lay.AddChild( btn );

	//Set function to call when button pressed.
	// btn.SetOnTouch( btn_OnTouch );
	
	//Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" );
    
	//Create the main app layout with objects vertically centered.
	layMain = app.CreateLayout( "Linear", "VCenter,FillXY" );
	layMain.SetBackground( "/Res/drawable/android" );

	//Create a text label and add it to main layout.
    txt = app.CreateText( "En construcción", 0.8, 0.2, "Multiline" );
    txt.SetTextSize( 24, "dip" );
    txt.SetTextColor( "#1776b2" );
	layMain.AddChild( txt );
	
	//Create a drawer containing a menu list.
	CreateDrawer();
	
	//Add main layout and drawer to app.	
	app.AddLayout( layMain );
	app.AddDrawer( drawerScroll, "Left", drawerWidth );
	
	//Add layout to app.
	app.AddLayout( lay );
    
    
}




function btn_actualizar() {
    lst.RemoveAll();
}


function showSeconds(seg){
    app.ShowPopup(10-seg);
    
}

function Update( progress )
{
    app.ShowPopup(progress + " segs");
}

function Hide()
{
    app.HideProgressBar();
}

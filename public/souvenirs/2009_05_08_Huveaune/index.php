<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>

<HEAD>
    <TITLE>Les sources de l'Huveaune avec LSR83</TITLE>

    <!-- On d�clare le code source -->
    <SCRIPT LANGUAGE="JavaScript" src="./fondu.js"></SCRIPT>
    <style type="text/css">
    <!--
    .Style1 {
        font-size: 16px;
        font-weight: bold;
    }

    .Style2 {
        font-size: 9px
    }
    -->
    </style>
</HEAD>

<!-- On charge le script et les images -->

<BODY onload="init();">


    <? var $Photo = 0; 
$Nb=14; 
$Photo=0; ?>
    <div align="center">
        <pre class="Style1">
Vendredi 8mai 2009
<span class="Style2">  <? echo "$Nb"; ?> photos </span></pre>
    </div>
    <br />

    <!-- Premiere image id=defilement1 -->

    <img id="defilement1" src="1.jpg" width=800px
        style="-moz-opacity:0;filter:alpha(opacity=0);margin-top:10px; margin-left:200px; ">
    photo A n�
    <? $Photo++; echo $Photo;?>
    <!-- Deuxieme image id=defilement2    /!\ positionn�e RELATIVEMENT par rapport � la 1�re /!\ -->
    <img src="2.jpg" id="defilement2" width=800px
        style="-moz-opacity:1;filter:alpha(opacity=100); position:relative;top:-600px;left:200px;">
    photo B n�
    <? $Photo++; echo " $Photo"; ?>

</HTML>
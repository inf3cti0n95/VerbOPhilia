<?php

$wordOfTheDay = "Maverick";


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "myDB";


$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM words";
$result = $conn->query($sql);
$i=0;
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()){
       $words[$i] = $row["word"];
       $i++;
        }

}
$conn->close();


?>

<!DOCTYPE html>
<html>
        <head>
            <link rel="stylesheet" type="text/css" href="sass/style.sass"/>
            <title>VerboPhilia</title>
            <meta name="theme-color" content="#040313">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <link rel="stylesheet" href="css/normalize.css" />
            <link href='https://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet' type='text/css'>
            <link rel="stylesheet" href="css/custom.css">
            <!--<link rel="stylesheet" href="css/style.css">-->
        </head>
        <body>
            <div id="particles-js"></div>

            <div id="wrapper">
                <div id="navbar">
                    <img  id="logo" src="img/logo.svg" alt="VerbOPhilia" >
                </div>
                <div id="contentWrapper">


                    <div id="content">
                        <div id="text">
                            <p id="myText">Word of the Day is</p>
                            <div id="wordWrapper">
                            <p id="wordOfTheDay" data-text="<?php echo end($words); ?>"></p>
                                <img src="img/arrow.svg" id="arrowLeft"  alt=""><img src="img/arrow.svg" id="arrowRight" alt="">
                            </div>
                        </div>
                    </div>
                    <div id="contentMain">
                        <p id="explaination">

                        <div id="loader">



                        </div>
                        </p>
                    </div>

                </div>
            </div>
            <!--<script src="https://code.jquery.com/jquery-3.1.0.min.js"   integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   crossorigin="anonymous"></script>-->
            <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>-->
            <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSRulePlugin.min.js"></script>-->
            <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/TextPlugin.min.js"></script>-->
            <!--<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>-->
            <script src="js/http_cdn.jsdelivr.net_particles.js_2.0.0_particles.min.js"></script>
            <script src="js/http_cdnjs.cloudflare.com_ajax_libs_gsap_1.19.0_TweenMax.min.js"></script>
            <script src="js/http_cdnjs.cloudflare.com_ajax_libs_gsap_1.19.0_plugins_CSSRulePlugin.min.js"></script>
            <script src="js/http_cdnjs.cloudflare.com_ajax_libs_gsap_1.19.0_plugins_TextPlugin.min.js"></script>
            <script src="js/http_code.jquery.com_jquery-3.1.0.js"></script>
            <!--<script src="js/app.js"></script>-->
            <script src="js/script.js"></script>
        </body>
</html>
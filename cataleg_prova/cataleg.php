<html lang="es">
    <body>
        <?php
        ini_set("display_errors", "on" );
        error_reporting(E_ALL);
        
        require 'Vehicle.php';
        $imatges = ["img/ferrari.jpeg","img/buggati.jpeg","img/mercedes.jpeg","img/porsche.jpeg","img/maserati.webp","img/rollsRoyce.jpeg"];//Array que conté les imatges dels cotxes
        $marques = ["buggati","mercedes","ferrari","porsche","maserati","rolls royce"];                             //Array que conté les marques dels cotxes
        $models  = ["aveiro","benz-A8","festa","911","poseidon","space-deyumn"];                                
                                                              
        $cataleg = [];  
                                                                                                    
        //Bucle que carrega el catàleg de cotxes
        for($i=0;$i<3;$i++){

            $marca = Vehicle::generaMarca($marques);
            $model = Vehicle::generaModel($models);
            $imatge = Vehicle::generaImatge($imatges);
            
            $matricula = Vehicle::generaMatricula();
                
            $cataleg[] = new Vehicle($marca,$model,$imatge, $matricula);
        }

        ?>
        
        
        <?php
        //Títol 
        echo "<h1>Vehicles</h1>";
        ?>
        
        <?php 
            //Bucle que mostra les especificacions de cada vehicle del catàleg
            for($i=0;$i < count($cataleg); $i++){ ?>
            
            <div>
                <a href="especificacions.php?matricula=<?= $cataleg[$i]->getMatricula() ?>"><?= $cataleg[$i]->getMatricula() ?>
                </a>

            <?php    echo "<img src=". $cataleg[$i]->getImatge() . "/>";
                echo "<p>".$cataleg[$i]->getMarca()."</p>";
                echo "<p>".$cataleg[$i]->getModel()."</p>";
                echo "<p>".$cataleg[$i]->getPreuVenta()."</p>";
            }
        ?>
            </div>
    </body>
</html>

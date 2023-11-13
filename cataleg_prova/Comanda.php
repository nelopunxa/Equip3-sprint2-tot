<?php
    class Comanda {
        private array $vehicles;
        private string $codi_comanda;
        private string $estat;

        public function __construct(string $codi_comanda, string $estat) {
            $this->vehicles = array();
            $this->codi_comanda = $codi_comanda;
            $this->estat = $estat;
        }

        public function afegirVehicle(Vehicle $vehicles) {
            $this->vehicles[] = $vehicle;
        }

        public function getCodiComanda(): string {
            return $this->codi_comanda;
        }

        public function getEstat(): string {
            return $this->estat;
        }

        public function getCodiFactura(): string {
            return $this->codi_factura;
        }

        public function getComprador(): Client {
            return $this->comprador;
        }

        public function getComanda(): Comanda {
            return $this->comanda;
        }
    }
?>
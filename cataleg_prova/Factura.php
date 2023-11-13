<?php
    class Factura {
        private string $client;
        private string $remitent;
        private DateTime $data;
        private array $numFactura;
        private array $preu;
        private array $producte;
        private array $cantitat;

        public function __construct() {
            $this->client = "Juan Jose Lopes";
            $this->remitent = "Jesus de Barqueta";
            $this->data = new DateTime();
            $this->numFactura = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            $this->preu = [100000, 500000, 900000, 100000000, 500000000];
            $this->producte = ["Cotxe", "Neumatics", "Chasis", "Aleró"];
            $this->cantitat = [1, 2, 3, 4];
        }


        public function posarClient(): string {
            return $this->client;
        }

        public function posarRemitent(): string {
            return $this->remitent;
        }

        public function generarPreu() : int {
            return $this->preu[array_rand($this->preu)];
        }

        public function generarProducte(): string {
            return $this->producte[array_rand($this->producte)];
        }

        // Funció per a generar una cantitat aleatoria
        public function generarCantitat(): int {
            return $this->cantitat[array_rand($this->cantitat)];
        }

        // Funció per a generar una factura aleatoria
        public function generarNumFactura(): int {
            return $this->numFactura[array_rand($this->numFactura)];
        }

        // Funció per a calcular el total de la factura
        public function calcularTotal($preu, $cantitat) {
            return $preu * $cantitat;
        }

        public function generarDataActual(): string {
            return $this->data->format('d/m/Y');
        }
    }
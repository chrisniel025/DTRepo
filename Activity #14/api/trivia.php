<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$trivia = [
  [
    "question" => "What is the first Pokémon listed in the Pokédex?",
    "answer" => "Bulbasaur"
  ],
  [
    "question" => "What type of Pokémon is Pikachu?",
    "answer" => "Electric"
  ],
  [
    "question" => "What is “Pokémon” short for?",
    "answer" => "Pocket Monsters"
  ],
  [
    "question" => "What 3 types are used for the starter Pokémon?",
    "answer" => "Grass, Fire, and Water"
  ],
  [
    "question" => "How many Pokémon were introduced in the first generation?",
    "answer" => "151"
  ],
  [
    "question" => "What Pokémon is known for evolving into different forms using stones?",
    "answer" => "Eevee"
  ],
  [
    "question" => "What is the highest level a Pokémon can reach?",
    "answer" => "100"
  ],
  [
    "question" => "What Pokéball always catches a Pokémon without failing?",
    "answer" => "Master Ball"
  ],
  [
    "question" => "What are the 2 main legendary Pokémon from the first generation?",
    "answer" => "Mew and Mewtwo"
  ],
  [
    "question" => "How many standard Pokémon types are there as of Generation IX?",
    "answer" => "Eighteen"
  ],
  [
    "question" => "What type is super-effective against Ghost?",
    "answer" => "Ghost"
  ],
  [
    "question" => "What attack is Lugia’s signature move?",
    "answer" => "Aeroblast"
  ],
  [
    "question" => "What is the name of Bulbasaur’s final evolution?",
    "answer" => "Venusaur"
  ],
  [
    "question" => "How many Pokémon generations have there been as of 2025?",
    "answer" => "Nine"
  ],
  [
    "question" => "What is someone who catches Pokémon called?",
    "answer" => "Trainer"
  ]
];

echo json_encode($trivia[array_rand($trivia)]);
?>
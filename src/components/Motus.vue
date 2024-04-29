<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from "vue";
import Loader from "./Loader.vue";
import Legends from "./Legends.vue";

interface ILetterState {
  letter: string;
  state: string;
}

const guess = ref<string>("");
const firstLetter = ref<string>("");
let targetWord = ref<string>("");
let words = ref<string[]>([]);
let isInvalid = ref<boolean>(false);
let isWin = ref<boolean>(false);
let guessedWords = reactive<ILetterState[][]>([]);

const maxAttempts = 7;
let attemptsLeft = ref<number>(maxAttempts);

let isLoading = ref<boolean>(true);

async function fetchWords(): Promise<void> {
  try {
    const response = await fetch("/words");
    words.value = (await response.text()).split("\r\n");
    isLoading.value = false;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la liste de mots : ",
      error
    );
  }
}

// Definition du mot mystère à trouver
watch(words, (newVal) => {
  targetWord.value = newVal[Math.floor(Math.random() * newVal.length)];
  console.log(
    "Je laisse cette variable pour pouvoir tester avec le mot mystère : ",
    targetWord.value
  );
});

// Récupération de la première lettre du mot mystère
watch(targetWord, (newVal) => {
  firstLetter.value = newVal[0];
});

const newGame = () => {
  guess.value = "";
  attemptsLeft.value = maxAttempts;
};

const checkGuess = () => {
  if (guess.value.length !== 6) {
    alert("Veuillez proposer un mot de 6 lettres.");
    return;
  }

  attemptsLeft.value--;
  guess.value = guess.value.toUpperCase();

  if (!words.value.includes(guess.value)) {
    isInvalid.value = true;
    return;
  }

  let newWord = ref<ILetterState[]>([
    { letter: firstLetter.value, state: "rightPlace" },
  ]);

  // Pour chaque lettres de la tentative on attribut un etat
  for (let i = 1; i < guess.value.length; i++) {
    const letter = guess.value[i];
    const indexLetterInTarget = targetWord.value.indexOf(letter);

    if (indexLetterInTarget !== -1) {
      if (letter === targetWord.value[i]) {
        newWord.value.push({ letter: letter, state: "rightPlace" });
      } else {
        newWord.value.push({ letter: letter, state: "wrongPlace" });
      }
    } else {
      newWord.value.push({ letter: letter, state: "incorrect" });
    }
  }

  guessedWords.push(newWord.value);
  if (guess.value === targetWord.value) {
    isWin.value = true;
    return;
  }
  guess.value = "";
};

const gameOver = computed(() => attemptsLeft.value === 0);

const reStart = () => {
  guess.value = "";
  attemptsLeft.value = maxAttempts;
  isWin.value = false;
  isInvalid.value = false;
  targetWord.value =
    words.value[Math.floor(Math.random() * words.value.length)];
  console.log(
    "Je laisse cette variable pour pouvoir tester avec le mot mystère : ",
    targetWord.value
  );
  firstLetter.value = targetWord.value[0];
  guessedWords = [];
};

onMounted(() => {
  newGame();
  fetchWords();
});
</script>



<template>
  <div class="flex flex-col justify-center h-full m-auto font-montserrat">
    <h1 class="mb-12 text-5xl font-bold">Motus</h1>

    <Loader v-if="isLoading" />

    <div v-else>
      <div class="flex mb-8" v-if="!guessedWords.length">
        {{ firstLetter }}
      </div>
      <ul
        v-for="(guessedWord, index) in guessedWords"
        :key="index"
        class="flex justify-between h-14 mb-5 max-xs-mobile:h-9 xsm-xs:h-11"
      >
        <li
          v-for="(letter, index) in guessedWord"
          :key="index"
          :class="{
            'border-solid rounded w-[56px] xsm-xs:w-[44px] max-xs-mobile:w-[36px] border justify-center flex items-center': true,
            'border-red-500': letter.state === 'rightPlace',
            'border-yellow-500': letter.state === 'wrongPlace',
            'border-violet-500': letter.state === 'incorrect',
          }"
        >
          {{ letter.letter }}
        </li>
      </ul>
      <div class="mt-8">
        <input
          v-model="guess"
          v-on:keyup.enter="checkGuess"
          :disabled="gameOver || isWin || isInvalid"
          placeholder="Proposez un mot de 6 lettres"
          class="p-2 rounded-lg max-xs:w-full w-[69%] max-xs:p-4"
        />

        <button
          @click="checkGuess"
          :disabled="gameOver || isWin || isInvalid"
          class="ml-4 bg-green-500 max-xs:mt-8 max-xs:w-full max-xs:ml-0"
        >
          Proposer
        </button>
      </div>

      <div v-if="isInvalid">
        <p class="mt-8">
          Le mot renseigné n'existe pas. Partie terminée.. Le mot mystère était
          "<span class="font-bold italic">{{ targetWord }}"</span>"
        </p>
        <button @click="reStart" class="mt-4 bg-green-500">
          Recommencer ?
        </button>
      </div>

      <div v-if="gameOver">
        <p class="mt-8">
          Partie terminée. Le mot mystère était "<span class="font-bold italic"
            >{{ targetWord }}"</span
          >"
        </p>
        <button @click="reStart" class="mt-4 bg-green-500">
          Recommencer ?
        </button>
      </div>

      <div v-if="isWin">
        <p class="mt-8">
          Félicitation !! Vous avez trouvé le mot mystère "<span
            class="font-bold italic"
            >{{ targetWord }}"</span
          >"
        </p>
        <button @click="reStart" class="mt-4 bg-green-500">
          Recommencer ?
        </button>
      </div>

      <Legends />
    </div>
  </div>
</template>

<style scoped>
.guesses {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.guess {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

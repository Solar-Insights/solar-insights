<template>
    <v-card class="pt-0">
        <div class="home-title-container">
            <div class="home-title"> Drive solar energy's adoption with Solar Insights </div>
            <div class="home-title-description"> Easy to use, highly adaptive, and accurate. Observe the viability of a solar installation in one single search. </div>
        </div>

        <div class="page-title text-center font-weight-bold pt-16 text-h6">
            <div class="pt-4"> La combinaison parfaite entre une nutrition savoureuse et une science éclairée. </div>
        </div>
        <div class="text-center">
            <div>
                <v-btn class="mt-6 mb-3 justify-center" color="black"> Explorer les recettes </v-btn>
            </div>
            <div> 
                ou
            </div>
            <div>
                <v-btn class="mt-3 justify-center" color="black"> Parcourir les articles </v-btn>
            </div>
        </div>
        
        <div>
            <div  class="page-title text-center font-weight-bold pt-16 text-h6"> Rejoignez-moi en créant un compte! Vous pourrez: </div>
            
            <div class="pt-4 text-center font-weight-bold brand-font"> 
                <ul style="list-style-position: inside;">
                    <li class="pb-2"> Mettre en favoris vos recettes préférées </li>
                    <li class="pb-2"> Enregistrer les articles de votre choix </li>
                    <li class="pb-2"> Être notifié des nouvelles publications </li>
                </ul>
                </div>
        </div>
        <div class="text-center pb-6">
            <v-btn class="mt-6 justify-center" color="black"> S'inscrire </v-btn>
        </div>
    </v-card>

    <div class="body-container">
        <div class="page-subtitle text-center mt-16 mb-8" style="font-weight: normal !important">
            Savoir Gourmand en bref
        </div>

        <div class="text-center mb-6">
            <v-icon class="my-3" size="x-large">mdi-bowl-outline</v-icon>
            <div class="font-weight-bold mb-3"> Découvrir des recettes à votre goût </div>
            <div> 
                En filtrant par type de repas et ingrédients, trouvez les recettes qui conviennent à vos choix et désirs alimentaires. 
            </div>
        </div>

        <div class="text-center mb-6">
            <v-icon class="my-3" size="x-large">mdi-book-open-page-variant-outline</v-icon>
            <div class="font-weight-bold mb-3"> Trouver réponses à vos questions </div>
            <div> 
                Allez découvrir des articles abordant différents aspects de la nutrition pour s'informer sur les répercussions de certaines habitudes alimentaires! 
            </div>
        </div>

        <div class="text-center mb-6">
            <v-icon class="my-3" size="x-large">mdi-account-outline</v-icon>
            <div class="font-weight-bold mb-3"> Garder à portée de main vos articles et recettes préférés </div>
            <div> 
                Créer un compte pour pouvoir accéder rapidement à vos classiques de la semaine ou articles fréquemment consultés.
            </div>
        </div>
    </div> 
</template>

<script setup lang="ts">
// Components
import logo_nobg from '@/assets/images/logo_nobg.png';
</script>

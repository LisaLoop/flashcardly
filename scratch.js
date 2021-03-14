// current_deck = 'french'

// decks = {}
//   - spanish
//   - french

//     - cards   // words
//       - front
//       - back
//       - last_render_date
//       - difficulty
//     - history = []
//     - current_order = [0,1,2,44,3,9,10,...]
//     - current_position = int 0


// c_o = [9, 5, 1]
// 9 = easy
// 5 = hard
// 1 = easy
// repeat deck
// n_c_o = [5]
// ... 4 days later 
//  n_c_o = [5, 9, 1]

// show_list_of_decks() 
//   for deck in ls.decks:
//      deck.name  
//        enable_deck()

//   -- you have studied X cards in X minutes
  

// enable_deck(deck_id):
//   current_deck = deck_id


// button:
//   show_history()
//     ls.decks[current_deck].history

//   set_difficulty(d):
//     ls.decks[current_deck].cards[current_word].diffficulty = d  // hard

//   save_last_render_date():
//     ls.decks[current_deck].cards[current_word].last_render_date = now()


// card_selection():


// initialize_deck()

//       a = {easy = 4, medium = 2, hard = 1 }

//       ls.decks[current_deck].current_order = select all cards from deck where (now() - last_render_date) < medium (1d)
//       r = shuffle()
//       ls.decks[current_deck].current_position = 0
//       save current_order to local storage.
//       ls.decks[current_deck].current_order = r



// render():


//   do we have a current deck in localStorage?
//   if not: first one
  
//   current_deck.


//   ls.decks[current_deck].current_order

//   get_current_order(ls.current_deck):
//     if no elements?:
//       initialize_deck()
      
//     current_card = deck[current_deck].cards[current_order[current_position]]
//     show_card(current_position)
//     decks[current_deck].history.push(current_card)
//     current_position ++ 
 

//     if current_position > len(current_order[current_position]):
//       initialize_deck()


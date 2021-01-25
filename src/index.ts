import produce, {Draft} from 'immer';
import {useCallback} from 'react';
import {getGlobal, setGlobal, useGlobal} from 'reactn';
import {State} from 'reactn/default';
import ReactNProvider from 'reactn/types/provider';

// Use property of Global State.
export function useGlobalImmer<P extends keyof State>( property: P ):
	[ State[P], ( f: ( draft: Draft<State[P]> ) => void | State[P] ) => void ];
// Use property from context provider.
export function useGlobalImmer<State extends {}, P extends keyof State>( property: P ):
	[ State[P], ( f: ( draft: Draft<State[P]> ) => void | State[P] ) => void ];

/**
 * UseImmer for Global State
 *
 * @param {string} property
 */
export function useGlobalImmer( property ) {
	const [ val, updateValue ] = useGlobal( property );

	return [ val, useCallback( updater => {
		updateValue( produce( val, updater ) );
	}, [ property, updateValue, val ] ) ];
}

// Use entire Global State
export function setGlobalImmer( updater: ( draft: Draft<State> ) => void | State ): Promise<State>;
// Use property of Global State
export function setGlobalImmer<K extends keyof State>( property: K, updater: ( draft: Draft<State[K]> ) => void | State[K] ): Promise<State>;

/**
 * Set Global State with Immer.
 *
 * @param {string|Function} propertyOrProducer - If a function is passed, we are working with entire
 * global state and this argument is used as the producer.
 * @param {Function|undefined} [producer] - If a property is passed as the first parameter,
 *                                          this argument is the producer
 */
export function setGlobalImmer( propertyOrProducer, producer? ) {
	if ( producer as Function ) {
		return setGlobal( {
			[ propertyOrProducer ]: produce( getGlobal()[ propertyOrProducer ], producer )
		} );
	}
	return setGlobal( produce( getGlobal(), propertyOrProducer ) );
}


// Use entire Global State
export function setGlobalImmerProvider<State>( provider: ReactNProvider<State>, updater: ( draft: Draft<State> ) => void | State ): Promise<State>;
// Use property of Global State
export function setGlobalImmerProvider<State, K extends keyof State>( provider: ReactNProvider<State>, property: K, updater: ( draft: Draft<State[K]> ) => void | State[K] ): Promise<State>;

/**
 * Set Global State with Immer within a custom Provider.
 *
 * @param {ReactNProvider} provider - Provider created via `createProvider`.
 * @param {string|Function} propertyOrProducer - If a function is passed, we are working with entire
 * global state and this argument is used as the producer.
 * @param {Function|undefined} [producer] - If a property is passed as the first parameter,
 *                                          this argument is the producer
 */
export function setGlobalImmerProvider( provider, propertyOrProducer, producer? ) {
	if ( producer as Function ) {
		return provider.setGlobal( {
			[ propertyOrProducer ]: produce( provider.getGlobal()[ propertyOrProducer ], producer )
		} );
	}
	return provider.setGlobal( produce( provider.getGlobal(), propertyOrProducer ) );
}

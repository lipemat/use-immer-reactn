import produce, {Draft} from 'immer';
import {useCallback} from 'react';
import {getGlobal, setGlobal, useGlobal} from 'reactn';
import {State} from 'reactn/default';

// Use property of Global State
export function useGlobalImmer<S extends keyof State>( property: S ):
	[ State[S], ( f: ( draft: Draft<State[S]> ) => void | State[S] ) => void ];

/**
 * UseImmer for Global State
 *
 * @param {string} property
 */
export function useGlobalImmer( property ) {
	const [ val, updateValue ] = useGlobal( property );

	return [ val, useCallback( updater => {
		updateValue( produce( getGlobal()[ property ], updater ) );
	}, [ property, updateValue ] ) ];
}

// Use property of Global State
export function setGlobalImmer<S extends keyof State>( property: S, updater: ( draft: Draft<State[S]> ) => void | State[S] ): Promise<State[S]>;

/**
 * Set Global State with Immer.
 *
 * @param {string} property
 * @param {Function} updater
 */
export function setGlobalImmer( property, updater ) {
	return setGlobal( {
		[ property ]: produce( getGlobal()[ property ], updater )
	} );
}

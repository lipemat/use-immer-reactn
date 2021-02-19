/**
 * This is needed to allow ReactN to map the global state.
 * Your app must have this available for typescript to compile.
 *
 * @link https://www.npmjs.com/package/reactn#typescript-support
 */
import 'reactn';

declare module 'reactn/default' {
	export interface State {
		example: string;
		keys: number;
		messages: object;
	}
}

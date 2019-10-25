import {useGlobalImmer} from 'use-immer-reactn';
import {setGlobal} from 'reactn';

setGlobal( {
	title: {
		en: 'Hello'
	}
} );

const TestComponent = () => {
	const [ title, setTitle ] = useGlobalImmer( 'title' );

	const changeTitleProducer = ( originalTitle ) => {
		originalTitle.en += ' Changed';
	};

	return (
		<>
			<h1>{title.en}</h1>
			<button onClick={() => setTitle( changeTitleProducer )}/>
		</>
	);
};
export default TestComponent;

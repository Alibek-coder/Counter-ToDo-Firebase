import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { decrease, fetchCounter, increase, minus, plus } from '../../Redux/counter.slice'
import { useEffect } from "react"
import "./Counter.css"
import { Loader } from "../Loader/Loader"

export const Counter = () => {
    const { counter, loading, error } = useSelector((store: RootState) => store.counter)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCounter(`${counter}`));
    }, [counter]);

    return (
        <>
            <div>{loading ? <Loader/> : null}</div>
            {error ? <div className="error">Error 404</div> : null}
            <div className="counter">
                <h1>Counter: {counter}</h1>
                <div className="buttons">
                    <button onClick={() => dispatch(increase())}>
                        +
                    </button>
                    <button onClick={() => dispatch(decrease())}>
                        -
                    </button>
                    <button onClick={() => dispatch(plus(5))}>
                        +5
                    </button>
                    <button onClick={() => dispatch(minus(5))}>
                        -5
                    </button>
                </div>
            </div>  
        </>
    )
}
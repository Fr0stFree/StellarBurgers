import axios from "axios";
import {v4 as uuid4} from 'uuid';
import {OK} from "http-status";

import ingredientsReducer, {
  addBuns,
  addIngredient,
  hideIngredientsLoadingError,
  IIngredientsState,
  initialState,
  removeIngredient,
} from "../ingredients/slices";
import {IngredientType} from "../ingredients/const";
import {generateIngredient, generateInitialState} from "./utils";
import {TRootState} from "../../hooks";
import {getIngredientsThunk} from "../ingredients/thunks";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('should handle ingredients slice', () => {
  let preloadedState = {} as IIngredientsState;
  beforeEach(() => {
    preloadedState = JSON.parse(JSON.stringify(initialState));
  });

  it('should return an initial state', () => {
    expect(ingredientsReducer(undefined, {type: 'unknown'})).toEqual(initialState);
  });

  it('should handle bun addition', () => {
    const bun = generateIngredient(IngredientType.BUN);
    expect(ingredientsReducer(preloadedState, addBuns(bun))).toEqual({
      ...initialState,
      selected: [
        {...bun, uuid: expect.any(String)},
        {...bun, uuid: expect.any(String)}
      ],
    });
  });

  it('should handle ingredient addition', () => {
    const ingredient = generateIngredient(IngredientType.MAIN);
    expect(ingredientsReducer(preloadedState, addIngredient(ingredient))).toEqual({
      ...initialState,
      selected: [{...ingredient, uuid: expect.any(String)}],
    });
  });

  it('should handle ingredients merging', () => {
    const selectedBun = {...generateIngredient(IngredientType.BUN), uuid: uuid4()};
    preloadedState.selected = [selectedBun];
    const main = generateIngredient(IngredientType.MAIN);
    expect(ingredientsReducer(preloadedState, addIngredient(main))).toEqual({
      ...initialState,
      selected: [{...main, uuid: expect.any(String)}, selectedBun],
    });
  });

  it('should handle ingredient removal', () => {
    preloadedState.selected = [{...generateIngredient(IngredientType.SAUCE), uuid: uuid4()}];
    expect(ingredientsReducer(preloadedState, removeIngredient(0))).toEqual(initialState);
  });

  it('should handle error hiding', () => {
    preloadedState.getIngredientsRequestStatus = 'failed';
    expect(ingredientsReducer(preloadedState, hideIngredientsLoadingError())).toEqual({
      ...initialState,
      getIngredientsRequestStatus: 'idle',
    });
  });
});

describe('should handle ingredients thunks', () => {
  let dispatch = jest.fn();
  let getState = jest.fn();
  let state = {} as TRootState;

  beforeEach(() => {
    state = generateInitialState();
    getState.mockReturnValue(state);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should receive ingredients successfully', async () => {
    const expectedIngredients = [generateIngredient(IngredientType.BUN), generateIngredient(IngredientType.MAIN)];
    mockedAxios.get.mockImplementation(() => Promise.resolve({
      data: {data: expectedIngredients, success: true},
      status: OK
    }));

    const result = await getIngredientsThunk()(dispatch, getState, undefined);

    expect(result.payload).toEqual(expectedIngredients);
    expect(result.type).toBe('ingredients/getIngredients/fulfilled');
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(getState).not.toHaveBeenCalled();
  });
});
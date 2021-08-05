#### 3 - Explique com suas palavras qual a vantagem de utilizarmos o useMemo.
Preserva na memória uma função/variável evitando que sejam recalculados em todas as alterações dos componentes. Apenas quando as dependências sofrerem alterações o cálculo será atualizado.
Sintaxe: ``useMemo(() => fn(), [dep])``

#### 5) Qual a diferença entre o useMemo e o UseCallback?
A diferença é que useCallback é funciona como uma useMemo especial que **memoiza** Callbacks.
```
//Essas duas linhas de código são equivalentes:
useCallback(callback, [deps]);
useMemo(() => callback, [deps]);

```
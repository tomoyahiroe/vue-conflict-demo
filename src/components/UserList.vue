<!-- src/components/UserList.vue -->
<script setup>
import { ref, computed } from 'vue'
import data from '../../data.json'
import Fuse from 'fuse.js'

const searchQuery = ref('')

// タイトルのみの検索設定
const fuseOptionsWithoutTags = {
  keys: ['title', 'titleEnglish'],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 1
}

// タイトル + タグの検索設定
const fuseOptionsWithTags = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'titleEnglish', weight: 0.7 },
    { name: 'tags', weight: 0.3 }
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 1
}

// Fuseインスタンスの作成
const fuseWithoutTags = new Fuse(data, fuseOptionsWithoutTags)
const fuseWithTags = new Fuse(data, fuseOptionsWithTags)

// 検索結果の計算
const searchResultsWithoutTags = computed(() => {
  if (!searchQuery.value.trim()) {
    return data.slice(0, 10) // 検索クエリがない場合は最初の10件を表示
  }
  return fuseWithoutTags.search(searchQuery.value).map(result => result.item)
})

const searchResultsWithTags = computed(() => {
  if (!searchQuery.value.trim()) {
    return data.slice(0, 10) // 検索クエリがない場合は最初の10件を表示
  }
  return fuseWithTags.search(searchQuery.value).map(result => result.item)
})

// 検索結果の件数
const countWithoutTags = computed(() => searchResultsWithoutTags.value.length)
const countWithTags = computed(() => searchResultsWithTags.value.length)

// 検索クエリをクリア
const clearSearch = () => {
  searchQuery.value = ''
}

// サンプル検索クエリ
const sampleQueries = [
  '国内総生産',
  'GDP',
  '資本形成',
  '家計',
  'Nominal'
]

const setSampleQuery = (query) => {
  searchQuery.value = query
}
</script>

<template>
  <div class="search-comparison-demo">
    <header class="demo-header">
      <h1>検索精度比較デモ</h1>
      <p class="subtitle">タグ付き検索 vs タグなし検索の精度を比較</p>
    </header>

    <!-- 検索入力エリア -->
    <div class="search-section">
      <div class="search-input-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="検索キーワードを入力してください..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-button">
          ✕
        </button>
      </div>
      
      <!-- サンプルクエリ -->
      <div class="sample-queries">
        <span class="sample-label">サンプル検索:</span>
        <button
          v-for="query in sampleQueries"
          :key="query"
          @click="setSampleQuery(query)"
          class="sample-button"
        >
          {{ query }}
        </button>
      </div>
    </div>

    <!-- 検索結果比較エリア -->
    <div class="results-container">
      <!-- タグなし検索結果 -->
      <div class="results-column">
        <div class="column-header without-tags">
          <h2>タイトルのみで検索</h2>
          <span class="result-count">{{ countWithoutTags }}件</span>
        </div>
        <div class="results-list">
          <div
            v-for="item in searchResultsWithoutTags"
            :key="item.id"
            class="result-item"
          >
            <h3 class="result-title">{{ item.title }}</h3>
            <p class="result-title-en">{{ item.titleEnglish }}</p>
            <div class="result-tags">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- タグ付き検索結果 -->
      <div class="results-column">
        <div class="column-header with-tags">
          <h2>タイトル + タグで検索</h2>
          <span class="result-count">{{ countWithTags }}件</span>
        </div>
        <div class="results-list">
          <div
            v-for="item in searchResultsWithTags"
            :key="item.id"
            class="result-item"
          >
            <h3 class="result-title">{{ item.title }}</h3>
            <p class="result-title-en">{{ item.titleEnglish }}</p>
            <div class="result-tags">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="tag highlighted"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 統計情報 -->
    <div class="stats-section" v-if="searchQuery.trim()">
      <div class="stat-item">
        <span class="stat-label">検索クエリ:</span>
        <span class="stat-value">「{{ searchQuery }}」</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">結果数の差:</span>
        <span class="stat-value">{{ Math.abs(countWithTags - countWithoutTags) }}件</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-comparison-demo {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Hiragino Kaku Gothic Pro', 'Yu Gothic', sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
}

.demo-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.search-section {
  margin-bottom: 30px;
}

.search-input-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #3498db;
}

.clear-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #7f8c8d;
}

.sample-queries {
  text-align: center;
  margin-top: 15px;
}

.sample-label {
  color: #7f8c8d;
  margin-right: 10px;
}

.sample-button {
  margin: 0 5px;
  padding: 8px 15px;
  background: #ecf0f1;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sample-button:hover {
  background: #bdc3c7;
}

.results-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.results-column {
  background: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
}

.column-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-header.without-tags {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.column-header.with-tags {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
}

.column-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.result-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 12px;
  border-radius: 15px;
  font-weight: bold;
}

.results-list {
  max-height: 600px;
  overflow-y: auto;
  padding: 0 20px 20px;
}

.result-item {
  background: white;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.result-title {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.4;
}

.result-title-en {
  margin: 0 0 15px 0;
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.3;
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: #ecf0f1;
  color: #2c3e50;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid #bdc3c7;
}

.tag.highlighted {
  background: #e8f5e8;
  border-color: #27ae60;
  color: #27ae60;
  font-weight: bold;
}

.stats-section {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .results-container {
    grid-template-columns: 1fr;
  }
  
  .stats-section {
    flex-direction: column;
    gap: 20px;
  }
  
  .demo-header h1 {
    font-size: 2rem;
  }
}
</style>